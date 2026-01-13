
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState } from './types';
import SplashScreen from './components/SplashScreen';
import InviteCard from './components/InviteCard';
import RSVPModal from './components/RSVPModal';

const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500), 
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: -150,
            opacity: [0, 0.4, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-[#94A3B8]/20 rounded-full"
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);

  useEffect(() => {
    // Reduzi para 2.5s para uma experiência mais fluida
    const timer = setTimeout(() => {
      setAppState('ready');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvite = () => {
    setAppState('opening');
    setTimeout(() => {
      setAppState('open');
    }, 1000);
  };

  return (
    <main className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* Sombras e Gradientes de Fundo Premium */}
      <div className="fixed top-0 right-0 w-[80vw] h-[80vw] bg-[#0F172A]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[80vw] h-[80vw] bg-[#1E3A8A]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {appState === 'open' && <FloatingParticles />}

      <AnimatePresence mode="wait">
        {appState === 'splash' && <SplashScreen key="splash" />}
        
        {appState !== 'splash' && (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full h-full"
          >
            <InviteCard 
              appState={appState} 
              onOpen={handleOpenInvite}
              onOpenRSVP={() => setIsRSVPModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <RSVPModal 
        isOpen={isRSVPModalOpen} 
        onClose={() => setIsRSVPModalOpen(false)} 
      />
    </main>
  );
};

export default App;
