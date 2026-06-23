"use client";
import { motion } from "framer-motion";
import { CONFIG } from "@/config";

export default function StoryGalleries() {
  // Animation variants for staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-32 flex flex-col gap-40 relative z-10">
      
      {/* 1. FRIENDS SECTION */}
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gradient-gold mb-4">You're My Lobster 🦞❤️</h2>
          <p className="text-white/50 tracking-widest text-sm uppercase">Ross & Rachel level endgame.</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {CONFIG.assets.friendsPhotos.map((src, i) => (
            <motion.div 
              key={i} variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              className="glass-panel aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-[0_0_30px_rgba(225,29,72,0.1)]"
            >
              <img src={src} alt={`Friends memory ${i + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 2. OFF CAMPUS SECTION */}
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gradient-gold mb-4">Our Off-Campus Story 🏒📚</h2>
          <p className="text-white/50 tracking-widest text-sm uppercase">Some stories are worth waiting for.</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {CONFIG.assets.offCampusPhotos.map((src, i) => (
            <motion.div 
              key={i} variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-panel aspect-[3/4] rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-[0_0_30px_rgba(168,85,247,0.1)]"
            >
              <img src={src} alt={`Off Campus memory ${i + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. THE SUMMER I TURNED PRETTY SECTION */}
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gradient-gold mb-4">Cousins Beach Vibes 🌅🏖️</h2>
          <p className="text-white/50 tracking-widest text-sm uppercase">The Summer I Turned Pretty.</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {CONFIG.assets.tsitpPhotos.map((src, i) => (
            <motion.div 
              key={i} variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-panel aspect-video md:aspect-square rounded-[2rem] flex items-center justify-center relative overflow-hidden group shadow-[0_0_30px_rgba(56,189,248,0.1)]"
            >
              <img src={src} alt={`TSITP memory ${i + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Soft ocean blue tint on hover */}
              <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blend-overlay" />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}