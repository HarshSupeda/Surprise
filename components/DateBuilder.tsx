"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

const NO_NOTES = [
  "Are you sure? 🥺",
  "Think again... ❤️",
  "I promise it'll be fun! ✨",
  "Don't break my heart 💔",
  "What if I bring chocolate? 🍫",
  "I'll let you choose the music! 🎵",
  "You're pressing the wrong button 🙈",
  "Okay, now you're just teasing me! 😌",
  "Pleaseeeee? 🥺❤️",
  "I'm not giving up! 💪",
  "Just click Yes already! 😂",
  "You know you want to... 😉",
  "Warning: Extreme happiness awaits if you click Yes ⚠️",
  "My heart can't take this anymore 🚑",
  "Okay, now you definitely can't click me! 🛑",
];

const STEPS = [
  {
    title: "What time should I pick you up?",
    options: ["🌅 Morning", "☀️ Afternoon", "🌙 Evening", "✨ Late Night"],
  },
  {
    title: "Choose Activity",
    options: ["☕ Coffee", "🍽 Dinner", "🎬 Movie", "🌃 Night Walk"],
  },
  {
    title: "Choose Mood",
    options: ["😄 Fun", "🌟 Memorable", "☕ Relaxed", "✨ Surprise Me"],
  },
  {
    title: "Choose Dessert",
    options: ["🍨 Naturals", "🍰 Cake", "🍫 Chocolate", "🍩 Donuts"],
  },
];

export default function DateBuilder() {
  // Gate State
  const [isAccepted, setIsAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });

  const isDodging = noCount >= NO_NOTES.length - 1;

  // Planner State
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleNoClick = () => {
    if (!isDodging) {
      const nextCount = noCount + 1;
      setNoCount(nextCount);

      // 🔥 FIX: Immediately jump out of the way the moment it breaks!
      if (nextCount >= NO_NOTES.length - 1) {
        setDodgePos({ x: 200, y: -100 });
      }
    }
  };

  const handleNoHover = () => {
    if (isDodging) {
      setDodgePos({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
      });
    }
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#fecdd3", "#fbcfe8", "#e879f9"],
    });
    setIsAccepted(true);
  };

  const handleSelect = (option: string) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      triggerFinalConfetti();
    }
  };

  const triggerFinalConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff1493", "#ffd700"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff69b4", "#ffffff"],
      });
    }, 250);
  };

  // REAL-TIME RESPONSE: Generate WhatsApp Message directly to your number
  const handleSendWhatsApp = () => {
    const message = `Hey! I just planned our perfect date on my birthday website! ❤️\n\n⏰ Time: ${selections[0]}\n🎯 Activity: ${selections[1]}\n✨ Mood: ${selections[2]}\n🍰 Dessert: ${selections[3]}\n\nI can't wait! 🥰`;
    const encodedMessage = encodeURIComponent(message);

    // Configured to send directly to your number (91 + 9152103431)
    const url = `https://wa.me/919152103431?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <section className="py-32 flex items-center justify-center min-h-screen px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {/* PHASE 1: THE INVITATION GATE */}
          {!isAccepted ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              className="text-center relative"
            >
              <Heart className="w-16 h-16 text-rose-400 mx-auto mb-8 animate-pulse drop-shadow-[0_0_30px_rgba(225,29,72,0.6)]" />
              <h2 className="text-4xl md:text-6xl font-light text-gradient-gold mb-12">
                I know you're running around today, but let's grab a quick
                coffee to refuel? ❤️
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[160px]">
                {/* YES BUTTON - 🔥 FIX: Changed to z-40 so it is ALWAYS on top */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  animate={{
                    padding: `${1.25 + noCount * 0.15}rem ${3 + noCount * 0.3}rem`,
                    fontSize: `${1.125 + noCount * 0.05}rem`,
                  }}
                  className="bg-gradient-to-r from-rose-500/30 to-purple-500/30 hover:from-rose-500/50 hover:to-purple-500/50 border border-rose-300/50 rounded-full text-rose-100 shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-colors z-40 whitespace-nowrap relative"
                >
                  YES ❤️
                </motion.button>

                {/* NO BUTTON - 🔥 FIX: Adjusted z-index so it slides safely underneath if it passes by */}
                <motion.button
                  animate={
                    isDodging
                      ? { x: dodgePos.x, y: dodgePos.y }
                      : { x: 0, y: 0 }
                  }
                  transition={
                    isDodging
                      ? { type: "spring", stiffness: 300, damping: 10 }
                      : { duration: 0.2 }
                  }
                  onHoverStart={handleNoHover}
                  onClick={handleNoClick}
                  className={`px-8 py-4 glass-panel rounded-full text-lg text-white/50 hover:text-white/80 transition-colors z-30 whitespace-nowrap ${
                    isDodging
                      ? "absolute cursor-not-allowed pointer-events-auto"
                      : "relative"
                  }`}
                  style={{ userSelect: "none" }}
                >
                  {noCount === 0 ? "NO 🙈" : NO_NOTES[noCount - 1]}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* PHASE 2: THE DATE BUILDER */
            <motion.div
              key="builder"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light text-gradient-gold mb-4">
                  Let's Plan Perfectly ❤️
                </h2>
                <p className="text-white/50 tracking-widest text-sm uppercase">
                  Design your dream evening
                </p>
              </div>

              <div className="glass-panel p-8 md:p-12 rounded-[2rem] relative overflow-hidden min-h-[450px] flex flex-col justify-center border-rose-500/20 shadow-[0_0_50px_rgba(225,29,72,0.1)]">
                <AnimatePresence mode="wait">
                  {!isComplete ? (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="w-full"
                    >
                      <p className="text-rose-300 text-sm tracking-widest uppercase mb-6 font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Step {currentStep + 1}{" "}
                        of {STEPS.length}
                      </p>
                      <h3 className="text-3xl font-light text-white mb-8">
                        {STEPS[currentStep].title}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {STEPS[currentStep].options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            className="p-5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 transition-all text-left font-light hover:shadow-[0_0_15px_rgba(225,29,72,0.2)]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* PHASE 3: THE FINAL TICKET */
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-400/50 shadow-[0_0_30px_rgba(225,29,72,0.3)]">
                        <Check className="w-10 h-10 text-rose-300" />
                      </div>
                      <h3 className="text-4xl font-light text-gradient-gold mb-8">
                        It's Official! ❤️
                      </h3>

                      <div className="space-y-4 text-lg font-light text-rose-100 bg-black/40 p-8 rounded-3xl border border-white/10 inline-block text-left w-full max-w-md relative overflow-hidden mb-8">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-purple-400" />
                        <p className="flex justify-between border-b border-white/10 pb-3 mt-2">
                          <span className="text-white/50">Time:</span>{" "}
                          <span>{selections[0]}</span>
                        </p>
                        <p className="flex justify-between border-b border-white/10 pb-3 mt-3">
                          <span className="text-white/50">Activity:</span>{" "}
                          <span>{selections[1]}</span>
                        </p>
                        <p className="flex justify-between border-b border-white/10 pb-3 mt-3">
                          <span className="text-white/50">Mood:</span>{" "}
                          <span>{selections[2]}</span>
                        </p>
                        <p className="flex justify-between border-b border-white/10 pb-3 mt-3">
                          <span className="text-white/50">Dessert:</span>{" "}
                          <span>{selections[3]}</span>
                        </p>
                      </div>

                      {/* LUXURY SITE-STYLED WHATSAPP BUTTON */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendWhatsApp}
                        className="w-full max-w-md mx-auto py-5 bg-gradient-to-r from-rose-500/20 to-purple-500/20 hover:from-rose-500/40 hover:to-purple-500/40 border border-rose-400/30 rounded-full tracking-widest transition-all text-rose-100 shadow-[0_0_30px_rgba(225,29,72,0.2)] font-light flex items-center justify-center gap-3"
                      >
                        <Send className="w-5 h-5 text-rose-300" />
                        SEND ME OUR PLAN 💌
                      </motion.button>
                      <p className="text-white/30 mt-4 text-[10px] tracking-widest uppercase">
                        This will send the plan directly to me
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
