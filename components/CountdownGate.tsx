"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG } from "@/config";

export default function CountdownGate({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  const triggerCelebration = () => {
    // Increased duration to 7.5 seconds!
    const end = Date.now() + 7500;
    (function frame() {
      confetti({ particleCount: 15, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff1493', '#ffd700'] });
      confetti({ particleCount: 15, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff69b4', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  useEffect(() => {
    const target = new Date(CONFIG.targetDate).getTime();
    
    const interval = setInterval(() => {
      if (isBirthday) {
        clearInterval(interval);
        return;
      }

      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsBirthday(true);
        clearInterval(interval);
        triggerCelebration(); 
        // Wait 7.5 seconds to watch fireworks before going to password
        setTimeout(onComplete, 7500); 
      } else {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBirthday, onComplete]);

  

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] aurora-bg"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 rounded-[3rem] text-center max-w-2xl w-full mx-4 border-rose-500/20 relative"
      >
        <h2 className="text-2xl text-white/60 mb-10 font-light">The moment your special day officially begins ❤️</h2>
        <div className="flex justify-center gap-4 md:gap-8 text-gradient-gold">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-light w-20 md:w-24 text-center">
                {value.toString().padStart(2, '0')}
              </span>
              <span className="text-sm text-white/40 uppercase tracking-widest mt-2">
                {unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
              </span>
            </div>
          ))}
        </div>

        
      </motion.div>
    </motion.div>
  );
}