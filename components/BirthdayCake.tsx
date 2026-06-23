"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG } from "@/config";

export default function BirthdayCake({ onComplete }: { onComplete?: () => void }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [messageIndex, setMessageIndex] = useState(-1);
  
  // Refs for both our continuous effects so we can stop them cleanly
  const fireworksInterval = useRef<NodeJS.Timeout | null>(null);
  const poppersInterval = useRef<NodeJS.Timeout | null>(null);

  // Clean up intervals just in case the component unmounts early
  useEffect(() => {
    return () => {
      if (fireworksInterval.current) clearInterval(fireworksInterval.current);
      if (poppersInterval.current) clearInterval(poppersInterval.current);
    };
  }, []);

  useEffect(() => {
    if (candlesBlown) {
      if (messageIndex < CONFIG.messages.cakeSequence.length - 1) {
        
        // 4 seconds for the first message, 4.5 seconds for all the others
        const delay = messageIndex === 0 ? 4000 : 4500;
        
        const timer = setTimeout(() => {
          setMessageIndex(prev => prev + 1);
        }, delay); 
        return () => clearTimeout(timer);
        
      } else if (messageIndex === CONFIG.messages.cakeSequence.length - 1) {
        
        // Give her 5.5 seconds to read the final beautiful message before it vanishes
        const finishTimer = setTimeout(() => {
          
          // STOP ALL FIREWORKS & POPPERS RIGHT BEFORE THE CAKE VANISHES
          if (fireworksInterval.current) clearInterval(fireworksInterval.current);
          if (poppersInterval.current) clearInterval(poppersInterval.current);
          
          if (onComplete) onComplete();
        }, 5500);
        return () => clearTimeout(finishTimer);
        
      }
    }
  }, [candlesBlown, messageIndex, onComplete]);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setMessageIndex(0);
    
    // 🔥 CINEMATIC MUSIC TRIGGER (Switches to Labyrinth)
    window.dispatchEvent(new CustomEvent("forceTrackChange", { detail: { trackIndex: 1 } }));
    
    const colors = ['#ff1493', '#ffd700', '#ff69b4', '#ffffff'];

    // 💥 1. GIANT INITIAL POPPER BURST (Fires immediately!)
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.9 }, startVelocity: 60, colors, zIndex: 0 });
    
    // 💥 2. CONTINUOUS RAPID FIRECRACKERS (Sides)
    fireworksInterval.current = setInterval(() => {
      confetti({ particleCount: 12, angle: 60, spread: 55, origin: { x: 0, y: 0.5 }, colors, zIndex: 0 });
      confetti({ particleCount: 12, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors, zIndex: 0 });
    }, 250);

    // 💥 3. PERIODIC PARTY POPPERS (Bottom Corners shooting up)
    poppersInterval.current = setInterval(() => {
      confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0.1, y: 0.9 }, startVelocity: 50, colors, zIndex: 0 });
      confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 0.9, y: 0.9 }, startVelocity: 50, colors, zIndex: 0 });
    }, 2000); // Fires every 2 seconds
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="flex flex-col items-center text-center px-4 w-full"
      >
        {!candlesBlown ? (
          <>
            <h2 className="text-3xl md:text-4xl font-light mb-24 text-rose-200">
              Close your eyes, make a wish, and blow the candles ❤️
            </h2>
            
            <div className="relative w-64 h-32 bg-white/5 rounded-t-xl border border-white/10 mt-8 mb-16 shadow-[0_-20px_50px_rgba(225,29,72,0.1)] flex justify-center">
               <div className="absolute -top-12 flex gap-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="w-3 h-12 bg-rose-200 rounded-t-md relative">
                     <motion.div 
                       animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8], rotate: [-2, 2, -2] }}
                       transition={{ repeat: Infinity, duration: 0.3 + (i * 0.1) }}
                       className="w-4 h-6 bg-orange-400 rounded-full absolute -top-6 -left-0.5 blur-[2px] shadow-[0_0_15px_#fb923c]"
                     />
                   </div>
                 ))}
               </div>
            </div>

            <button 
              onClick={handleBlowCandles}
              className="px-10 py-4 bg-gradient-to-r from-rose-500/20 to-purple-500/20 hover:from-rose-500/40 hover:to-purple-500/40 border border-rose-400/30 rounded-full tracking-widest transition-all text-rose-100 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
            >
              BLOW CANDLES ❤️
            </button>
          </>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {messageIndex >= 0 && (
                <motion.h2
                  key={messageIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 1.5 }}
                  className="text-3xl md:text-5xl font-light text-gradient-gold px-4 max-w-3xl leading-snug"
                >
                  {CONFIG.messages.cakeSequence[messageIndex]}
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  );
}