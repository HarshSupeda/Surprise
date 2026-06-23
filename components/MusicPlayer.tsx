"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, SkipBack, SkipForward } from "lucide-react";
import { CONFIG } from "@/config";

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitialMount = useRef(true);

  // 1. Initial Setup and Autoplay
  useEffect(() => {
    const audio = new Audio(CONFIG.assets.playlist[0].src);
    audio.volume = 0.6;
    audioRef.current = audio;

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    const handleEnded = () => setCurrentIndex((prev) => (prev + 1) % CONFIG.assets.playlist.length);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.src = "";
    };
  }, []);

  // 2. Handle Track Changes (Next/Prev/Forced)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; 
    }
    
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = CONFIG.assets.playlist[currentIndex].src;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [currentIndex]);

  // 3. LISTEN FOR CINEMATIC OVERRIDES (Like the Cake blowing out)
  useEffect(() => {
    const handleForceTrack = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetIndex = customEvent.detail.trackIndex;
      if (targetIndex >= 0 && targetIndex < CONFIG.assets.playlist.length) {
        setCurrentIndex(targetIndex);
      }
    };

    window.addEventListener("forceTrackChange", handleForceTrack);
    return () => window.removeEventListener("forceTrackChange", handleForceTrack);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const nextTrack = () => setCurrentIndex((prev) => (prev + 1) % CONFIG.assets.playlist.length);
  const prevTrack = () => setCurrentIndex((prev) => (prev === 0 ? CONFIG.assets.playlist.length - 1 : prev - 1));

  const currentTrack = CONFIG.assets.playlist[currentIndex];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-4 glass-panel p-3 pr-5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl"
    >
      <button onClick={togglePlay} className="relative w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden group shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-transform hover:scale-105 shrink-0">
        <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
        {isPlaying ? <Pause className="w-5 h-5 text-rose-300 z-10" /> : <Play className="w-5 h-5 text-rose-300 z-10 ml-1" />}
      </button>

      <div className="flex flex-col w-32 overflow-hidden whitespace-nowrap">
        <AnimatePresence mode="popLayout">
          <motion.div key={currentIndex} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col">
            <span className="text-sm font-light text-rose-100 flex items-center gap-2 truncate">
              <Music className="w-3 h-3 shrink-0" /> {currentTrack.title}
            </span>
            <span className="text-xs text-white/40 truncate pl-5">{currentTrack.artist}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 border-l border-white/10 pl-4 ml-2 shrink-0">
        <button onClick={prevTrack} className="text-white/40 hover:text-rose-300 transition-colors"><SkipBack className="w-4 h-4 fill-current" /></button>
        <button onClick={nextTrack} className="text-white/40 hover:text-rose-300 transition-colors"><SkipForward className="w-4 h-4 fill-current" /></button>
      </div>
    </motion.div>
  );
}