"use client";
import { motion } from "framer-motion";
import { CONFIG } from "@/config";

export default function VideoMessage() {
  return (
    <section className="py-32 flex justify-center items-center px-4 relative">
      <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="max-w-4xl w-full flex flex-col items-center z-10"
      >
        <h2 className="text-3xl md:text-5xl font-light mb-12 text-gradient-gold">A special video for you ❤️</h2>
        <div className="w-full aspect-video glass-panel rounded-3xl p-2 md:p-4 shadow-[0_0_50px_rgba(225,29,72,0.2)]">
          <iframe 
            className="w-full h-full rounded-2xl"
            src={CONFIG.assets.video} 
            title="Special Message"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}