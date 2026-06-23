"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/config";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Updated to use CONFIG.messages.loader
    if (index < CONFIG.messages.loader.length) {
      const timer = setTimeout(() => setIndex(index + 1), 2500);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [index, onComplete]);

  return (
    <motion.div className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center flex-col">
      <div className="h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {index < CONFIG.messages.loader.length && (
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-light text-rose-100/80 tracking-wide text-center px-4"
            >
              {CONFIG.messages.loader[index]}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
      
      {/* Premium Progress Line */}
      <div className="w-64 h-[1px] bg-white/10 mt-8 overflow-hidden rounded-full">
        <motion.div 
          className="h-full bg-gradient-to-r from-transparent via-rose-300 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}