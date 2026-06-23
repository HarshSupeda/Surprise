"use client";
import { motion } from "framer-motion";
import { CONFIG } from "@/config";

export default function StoryAdventure() {
  return (
    <section className="py-32 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-light text-gradient-gold mb-4">Our Story ❤️</h2>
        <p className="text-white/50 tracking-widest text-sm uppercase">Every beautiful chapter so far</p>
      </div>

      <div className="space-y-32">
        {CONFIG.messages.storyChapters.map((chapter, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-panel border-white/10 shadow-[0_0_30px_rgba(225,29,72,0.15)] group">
                  <img 
                    src={chapter.image} 
                    alt={chapter.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <span className="text-rose-300/80 font-mono tracking-[0.2em] mb-4 text-sm">
                  {chapter.title.toUpperCase()}
                </span>
                <h3 className="text-3xl md:text-4xl font-light text-rose-50 leading-relaxed drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                  {chapter.text}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}