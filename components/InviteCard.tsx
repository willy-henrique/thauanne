
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, Sparkles, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { AppState } from '../types';
import { EVENT_DETAILS } from '../constants';
import Countdown from './Countdown';
import PhotoGallery from './PhotoGallery';

interface InviteCardProps {
  appState: AppState;
  onOpen: () => void;
  onOpenRSVP: () => void;
}

const InviteCard: React.FC<InviteCardProps> = ({ appState, onOpen, onOpenRSVP }) => {
  const isOpen = appState === 'open' || appState === 'opening';
  const detailsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* --- CAPA PREMIUM NAVY --- */
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 z-50 w-full h-[100svh] flex flex-col items-center justify-between bg-[#0F172A]"
            onClick={onOpen}
          >
            {/* Imagem de Fundo com Overlay Navy Profundo */}
            <div className="absolute inset-0">
              <img 
                src="/thauanne.png" 
                className="w-full h-full object-cover" 
                alt="Capa"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/40 to-[#0F172A]/90" />
            </div>

            {/* Bordas Platinum Finas */}
            <div className="absolute inset-6 border border-white/10 rounded-xl pointer-events-none" />
            <div className="absolute inset-8 border border-white/5 rounded-xl pointer-events-none" />

            <div className="relative z-10 pt-20 text-center text-white px-6">
              <motion.span 
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.5em' }}
                className="font-cinzel text-[10px] uppercase mb-6 block text-white/50"
              >
                Convite Especial
              </motion.span>
              <h1 className="font-playfair text-5xl sm:text-7xl font-bold italic mb-4 text-[#F8FAFC] tracking-tight text-center">Thauanne Victoria</h1>
              <div className="w-20 h-[1px] bg-white/20 mx-auto my-6" />
              <span className="font-cinzel text-xl sm:text-3xl tracking-[0.4em] text-white/80">{EVENT_DETAILS.age}</span>
            </div>

            <div className="relative z-10 pb-24 text-center text-white px-8">
              <p className="font-playfair italic text-lg sm:text-2xl text-white/70 mb-16 max-w-sm mx-auto">
                "Uma manhã para celebrar o início de uma nova e brilhante jornada."
              </p>
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5 }} 
                className="flex flex-col items-center space-y-3 cursor-pointer group"
              >
                <span className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-white/40 group-hover:text-white/60 transition-colors">Abrir Convite</span>
                <ChevronDown size={28} className="text-white/30 group-hover:text-white/60" />
              </motion.div>
            </div>
            
            <div className="absolute top-10 right-10 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <span className="font-cinzel text-white text-xs font-bold">TV</span>
            </div>
          </motion.div>
        ) : (
          /* --- CONTEÚDO ABERTO PREMIUM WHITE/NAVY --- */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-[100svh] overflow-y-auto custom-scroll bg-[#F8FAFC] paper-texture"
          >
            <div className="w-full max-w-[600px] mx-auto flex flex-col items-center pt-12 pb-24 px-6">
              
              {/* SEÇÃO 1: CABEÇALHO E LOCALIZAÇÃO */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center w-full mb-8 h-[calc(100svh-100px)] flex flex-col justify-center"
              >
                <h2 className="font-cinzel text-[#0F172A] text-[11px] tracking-[0.5em] mb-8 uppercase font-bold text-center">A Celebração</h2>
                <p className="font-playfair text-[#0F172A] text-2xl italic leading-relaxed mb-10 px-2 text-center">
                  "A vida é um presente, e celebrá-la é a maior alegria."
                </p>

                {/* Grid Navy/Silver */}
                <div className="grid grid-cols-1 gap-6 text-left max-w-[300px] mx-auto mb-10">
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-montserrat text-[9px] uppercase text-[#94A3B8] tracking-widest font-bold mb-0.5">Data do Evento</p>
                      <p className="font-cinzel text-xs font-bold text-[#0F172A] leading-tight uppercase">{EVENT_DETAILS.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-montserrat text-[9px] uppercase text-[#94A3B8] tracking-widest font-bold mb-0.5">Horário</p>
                      <p className="font-cinzel text-xs font-bold text-[#0F172A] leading-tight">{EVENT_DETAILS.time}</p>
                    </div>
                  </div>

                  <a 
                    href={EVENT_DETAILS.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-5 group hover:bg-[#0F172A]/5 p-2 -m-2 rounded-2xl transition-all"
                  >
                    <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-montserrat text-[9px] uppercase text-[#94A3B8] tracking-widest font-bold mb-0.5">Onde será</p>
                      <p className="font-cinzel text-xs font-bold text-[#0F172A] leading-tight uppercase underline decoration-dotted decoration-[#94A3B8] underline-offset-4">{EVENT_DETAILS.location}</p>
                      <p className="font-montserrat text-[9px] text-[#64748B] mt-1 font-medium leading-tight">{EVENT_DETAILS.address}</p>
                    </div>
                  </a>
                </div>

                {/* BOTÃO PARA DETALHES */}
                <div className="relative flex flex-col items-center mt-8">
                  <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                    className="absolute w-16 h-16 bg-[#0F172A]/10 rounded-full border border-[#0F172A]/20"
                  />
                  <motion.button
                    onClick={scrollToDetails}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E3A8A] rounded-full shadow-lg border-2 border-white"
                  >
                    <ArrowDown size={24} className="text-white animate-bounce" />
                  </motion.button>
                  <span className="mt-4 font-cinzel text-[10px] font-bold tracking-[0.4em] text-[#0F172A] uppercase">Ver Detalhes</span>
                </div>
              </motion.section>

              {/* SEÇÃO DE DETALHES CENTRALIZADA (MENSAGEM + COUNTDOWN) */}
              <div ref={detailsRef} className="w-full flex flex-col items-center min-h-[90svh] justify-center text-center py-16">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full flex flex-col items-center"
                >
                  <Sparkles className="text-[#94A3B8] mb-8 opacity-30" size={32} />
                  
                  <div className="max-w-[480px] w-full mb-10">
                    <p className="font-playfair italic text-[#1F2937] text-xl sm:text-2xl leading-relaxed text-center px-4">
                      {EVENT_DETAILS.message}
                    </p>
                  </div>

                  <div className="w-16 h-[1px] bg-[#0F172A]/10 mb-10" />

                  <div className="w-full flex flex-col items-center">
                    <h3 className="font-cinzel text-[#0F172A] text-[10px] tracking-[0.6em] mb-8 uppercase font-bold">Contagem Regressiva</h3>
                    <Countdown />
                  </div>

                  {/* BOTÃO PARA VER GALERIA */}
                  <div className="relative flex flex-col items-center mt-12">
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                      className="absolute w-14 h-14 bg-[#0F172A]/5 rounded-full border border-[#0F172A]/10"
                    />
                    <motion.button
                      onClick={scrollToGallery}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="z-10 flex items-center justify-center w-14 h-14 bg-white border border-[#0F172A]/10 rounded-full shadow-md text-[#0F172A]"
                    >
                      <ImageIcon size={20} />
                    </motion.button>
                    <span className="mt-4 font-cinzel text-[9px] font-bold tracking-[0.3em] text-[#0F172A]/60 uppercase">Ver Galeria</span>
                  </div>
                </motion.div>
              </div>

              {/* SEÇÃO FINAL UNIFICADA (GALERIA + RSVP) */}
              <motion.div 
                ref={galleryRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col items-center text-center space-y-8 py-12"
              >
                <div className="w-full">
                  <h3 className="font-cinzel text-[#0F172A] text-[10px] tracking-[0.6em] mb-8 uppercase font-bold">Galeria do Lugar</h3>
                  <div className="px-2 w-full">
                    <PhotoGallery />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center px-4">
                  <div className="flex flex-col items-center w-full space-y-8">
                    <div className="text-center w-full flex flex-col items-center">
                      <p className="font-montserrat text-[10px] text-[#94A3B8] mb-4 uppercase tracking-[0.3em] font-bold">{EVENT_DETAILS.confirmationDeadline}</p>
                      
                      <button 
                        onClick={onOpenRSVP}
                        className="w-full max-w-sm py-5 bg-[#0F172A] text-white rounded-full font-montserrat font-bold tracking-[0.4em] shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:bg-[#1e293b] transition-all transform active:scale-95 text-[11px]"
                      >
                        CONFIRMAR PRESENÇA
                      </button>
                    </div>
                    
                    {/* MENSAGEM FINAL VISÍVEL */}
                    <div className="mt-6 text-[#94A3B8] font-cinzel text-[10px] tracking-[0.6em] uppercase font-bold opacity-70">
                      Esperamos por você
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InviteCard;
