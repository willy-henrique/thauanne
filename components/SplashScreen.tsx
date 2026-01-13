
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC]"
    >
      {/* Background Sutil com Shimmer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E2E8F0_0%,_transparent_70%)]"
      />

      <div className="relative z-10 flex flex-col items-center max-w-[80vw]">
        {/* Brasão Minimalista Navy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-16"
        >
          <div className="w-24 h-24 border border-[#0F172A]/10 rounded-full flex items-center justify-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-cinzel text-[#0F172A] text-2xl font-bold tracking-[0.2em]"
            >
              TV
            </motion.span>
          </div>
          
          {/* Anel de progresso único (não infinito) */}
          <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
            <motion.circle
              cx="48"
              cy="48"
              r="47"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="translate-x-1 translate-y-1"
            />
          </svg>
        </motion.div>

        {/* Nome com Reveal Elegante */}
        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-[#0F172A] text-2xl sm:text-3xl font-bold uppercase tracking-[0.4em] text-center"
          >
            Thauanne Victória
          </motion.h1>
        </div>

        {/* Divisor Platinum */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
          className="w-12 h-[1px] bg-[#94A3B8] mb-12"
        />

        {/* Status de Carregamento */}
        <div className="flex flex-col items-center space-y-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-montserrat text-[9px] text-[#0F172A] tracking-[0.6em] uppercase font-bold text-center"
          >
            Convite Especial
          </motion.p>
          
          {/* Barra de progresso linear fina */}
          <div className="w-32 h-[1px] bg-[#0F172A]/10 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#0F172A]/40"
            />
          </div>
        </div>
      </div>

      {/* Detalhes de Papelaria de Luxo (Cantos) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="absolute top-12 left-12 w-16 h-16 border-t border-l border-[#0F172A]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-[#0F172A]"
      />
    </motion.div>
  );
};

export default SplashScreen;
