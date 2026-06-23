"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CountdownGate from "@/components/CountdownGate";
import PasswordGate from "@/components/PasswordGate";
import CinematicLoader from "@/components/CinematicLoader";
import MusicPlayer from "@/components/MusicPlayer";
import BirthdayCake from "@/components/BirthdayCake";
import GiftBoxes from "@/components/GiftBoxes";
import StoryAdventure from "@/components/StoryAdventure";
import StoryGalleries from "@/components/StoryGalleries";
import DateBuilder from "@/components/DateBuilder";
import VideoMessage from "@/components/VideoMessage";
import confetti from "canvas-confetti";

export default function App() {
  const [step, setStep] = useState<"countdown" | "password" | "loader" | "main">("countdown");
  const [showHero, setShowHero] = useState(true);
  const [showRestOfSite, setShowRestOfSite] = useState(false); // NEW STATE!

  // Auto-hide Hero
  useEffect(() => {
    if (step === "main") {
      const timer = setTimeout(() => setShowHero(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const triggerFirecrackers = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min: number, max: number) { return Math.random() * (max - min) + min; }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff1493', '#ffd700'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff69b4', '#ffffff'] });
    }, 250);
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white aurora-bg selection:bg-rose-500/30 font-sans overflow-hidden">
      
      {(step === "loader" || step === "main") && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {step === "countdown" && <CountdownGate key="countdown" onComplete={() => setStep("password")} />}
        {step === "password" && <PasswordGate key="password" onUnlock={() => setStep("loader")} />}
        {step === "loader" && <CinematicLoader key="loader" onComplete={() => setStep("main")} />}
      </AnimatePresence>

      {step === "main" && (
        <SmoothScroll>
          <AnimatePresence mode="wait">
            
            {showHero ? (
              <motion.section 
                key="hero"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-screen flex items-center justify-center flex-col relative overflow-hidden"
              >
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
                <motion.h1 initial={{ y: 40, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="text-5xl md:text-8xl font-light tracking-[0.15em] text-gradient-gold text-center mb-6 z-10 px-4">
                  HAPPY BIRTHDAY
                </motion.h1>
              </motion.section>
            ) : (

              <motion.div key="content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                
                {/* CAKE VANISHES WHEN COMPLETE */}
                <AnimatePresence mode="wait">
                  {!showRestOfSite && (
                    <motion.div key="cake" exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} transition={{ duration: 1.5 }}>
                      <div onClick={triggerFirecrackers}>
                        <BirthdayCake onComplete={() => setShowRestOfSite(true)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* THE REST OF THE SITE REVEALS ITSELF */}
                {showRestOfSite && (
                  <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}>
                    <StoryAdventure />
                    <GiftBoxes />
                    <StoryGalleries />
                    <DateBuilder />
                    <VideoMessage />

                    <footer className="py-32 text-center relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md">
                      <p className="text-white/40 font-light tracking-wide max-w-md mx-auto px-4 leading-relaxed">
                        Thank you for making life more beautiful simply by being in it.
                      </p>
                      <motion.p whileHover={{ scale: 1.05 }} className="mt-4 text-gradient-gold text-2xl font-light tracking-widest">
                        Happy Birthday, Beautiful ❤️
                      </motion.p>
                    </footer>
                  </motion.div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </SmoothScroll>
      )}
    </main>
  );
}