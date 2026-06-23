"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

export default function InteractiveDate() {
  const [step, setStep] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  // The Escaping "NO" Button Logic
  const handleNoHover = () => {
    setNoPosition({
      x: (Math.random() - 0.5) * 300, // Moves randomly up to 150px left/right
      y: (Math.random() - 0.5) * 300, // Moves randomly up to 150px up/down
    });
  };

  const handleYesClick = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ff1493', '#ff69b4', '#ffb6c1'] });
    setStep(2);
  };

  const handleFinalSubmit = () => {
    // In a real app, you'd save this to localStorage or a database
    localStorage.setItem("dateDetails", JSON.stringify({ location: location === "Other" ? customLocation : location }));
    confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 }, colors: ['#fecdd3', '#fce7f3'] });
    setStep(3);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: The Question */}
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}
            className="text-center z-10"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-12 text-gradient-gold">
              Would you like to go on a date with me? ❤️
            </h2>
            
            <div className="flex items-center justify-center gap-8 relative h-32">
              <button 
                onClick={handleYesClick}
                className="px-10 py-4 glass-panel rounded-full text-xl hover:bg-rose-500/20 hover:border-rose-400/50 transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.2)]"
              >
                YES ❤️
              </button>
              
              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y }}
                onHoverStart={handleNoHover}
                onClick={handleNoHover}
                className="px-10 py-4 glass-panel rounded-full text-xl text-white/50 absolute"
                style={{ marginLeft: "150px" }}
              >
                NO 🙈
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: The Booking Experience */}
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel p-10 rounded-[2rem] max-w-xl w-full mx-4 z-10"
          >
            <h2 className="text-3xl font-light text-center mb-8 text-rose-200">
              When shall we create a beautiful memory together? ❤️
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
                <input type="date" defaultValue="2026-06-24" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-rose-400/50" />
              </div>
              
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
                <input type="time" defaultValue="17:00" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-rose-400/50" />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
                <select 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 appearance-none focus:outline-none focus:border-rose-400/50"
                >
                  <option value="" disabled selected>Where should we go?</option>
                  <option value="Coffee">☕ Coffee</option>
                  <option value="Lunch">🍝 Lunch</option>
                  <option value="Dinner">🍽 Dinner</option>
                  <option value="Your Place">🏠 Your Place</option>
                  <option value="Other">📍 Other</option>
                </select>
              </div>

              {location === "Other" && (
                <motion.input 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  type="text" placeholder="Type your perfect location..." onChange={(e) => setCustomLocation(e.target.value)}
                  className="w-full bg-black/40 border border-rose-500/30 rounded-xl py-4 px-4 focus:outline-none"
                />
              )}

              <button 
                onClick={handleFinalSubmit}
                className="w-full py-4 mt-8 bg-gradient-to-r from-rose-500/30 to-purple-500/30 hover:from-rose-500/50 hover:to-purple-500/50 border border-rose-400/50 rounded-xl transition-all duration-300 tracking-widest text-white shadow-[0_0_20px_rgba(225,29,72,0.3)]"
              >
                LET'S MAKE IT OFFICIAL ❤️
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Success Finale */}
        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <Heart className="w-20 h-20 text-rose-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" />
            <h2 className="text-5xl font-light text-gradient-gold mb-4">I can't wait ❤️</h2>
            <p className="text-white/60 text-lg">Your reservation is confirmed in my heart.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}