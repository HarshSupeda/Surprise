"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Heart } from "lucide-react";
import { CONFIG } from "@/config";

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CONFIG.password) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setInput("");
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] aurora-bg"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating background particles can go here */}
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass-panel p-12 rounded-3xl flex flex-col items-center max-w-md w-full mx-4 relative z-10"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <Lock className="w-6 h-6 text-rose-300" />
        </div>
        
        <h2 className="text-2xl font-light tracking-wide mb-2 text-center text-gradient-gold">
          Someone special created something beautiful for you
        </h2>
        <p className="text-white/40 text-sm mb-8 text-center">Enter the date (MMDDYY)</p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-rose-400/50 transition-colors"
          placeholder="••••••"
          autoFocus
        />
        
        {error && <p className="text-rose-400 mt-4 text-sm flex items-center gap-2"><Heart size={14} className="fill-rose-400" /> Try again, beautiful</p>}
      </motion.form>
    </motion.div>
  );
}