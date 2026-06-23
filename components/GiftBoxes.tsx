"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles, X, Heart } from "lucide-react";
import { CONFIG } from "@/config";

export default function GiftBoxes() {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [activeGift, setActiveGift] = useState<{ message: string, image: string } | null>(null);

 // 🔥 UPGRADED LOGIC: Force-locks both native and SmoothScroll custom scrolling
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (activeGift) {
      // 1. Lock native scrolling
      document.body.style.overflow = 'hidden';
      
      // 2. Lock custom smooth scrolling (blocks mouse wheel and touchscreen dragging)
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [activeGift]);

  const handleOpen = (index: number) => {
    // ALWAYS show the gift when clicked (allows reopening)
    setActiveGift(CONFIG.messages.gifts[index]);

    // ONLY trigger the celebration and save state if it's the FIRST time opening
    if (!openedBoxes.includes(index)) {
      const newOpened = [...openedBoxes, index];
      setOpenedBoxes(newOpened);

      // Romantic confetti burst for every new gift
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fecdd3', '#fbcfe8', '#e879f9']
      });

      // Ultimate surprise if she opens all 10 in one sitting
      if (newOpened.length === 10) {
        setTimeout(() => triggerUltimateSurprise(), 2000);
      }
    }
  };

  const triggerUltimateSurprise = () => {
    const end = Date.now() + 3 * 1000;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff1493', '#ffd700'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff69b4', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-light text-gradient-gold mb-4">Birthday Gift Boxes ❤️</h2>
        <p className="text-white/50 tracking-widest text-sm uppercase">10 little surprises just for you</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {CONFIG.messages.gifts.map((_, i) => {
          const isOpened = openedBoxes.includes(i);
          return (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              onClick={() => handleOpen(i)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${
                isOpened 
                  ? 'glass-panel opacity-80 hover:opacity-100 border-white/20 hover:border-rose-300/50 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                  : 'bg-gradient-to-br from-rose-500/20 to-purple-500/20 border border-rose-300/30 shadow-[0_0_30px_rgba(225,29,72,0.15)]'
              }`}
            >
              {isOpened ? (
                <Heart className="w-10 h-10 text-rose-300/70 mb-2" />
              ) : (
                <Gift className="w-12 h-12 text-rose-200 mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              )}
              <span className={`text-xs font-light mt-2 ${isOpened ? 'text-rose-200' : 'text-white/60'}`}>
                {isOpened ? "Reopen 💌" : `Gift ${i + 1}`}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* LUXURY PHOTO & MESSAGE REVEAL MODAL */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setActiveGift(null)} // Click anywhere to close
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking the card from closing it
              className="glass-panel p-4 md:p-6 rounded-[2rem] max-w-md w-full text-center shadow-[0_0_50px_rgba(225,29,72,0.3)] relative overflow-hidden"
            >
              <button 
                onClick={() => setActiveGift(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Photo Container */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative mb-6 border border-white/10 bg-black/50">
                <img 
                  src={activeGift.image} 
                  alt="A special memory" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text Message */}
              <Sparkles className="w-6 h-6 text-rose-300 mx-auto mb-3" />
              <p className="text-xl md:text-2xl font-light text-rose-100 px-4 leading-relaxed">
                {activeGift.message}
              </p>
              <p className="text-white/30 mt-6 text-[10px] tracking-widest uppercase">
                Click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}