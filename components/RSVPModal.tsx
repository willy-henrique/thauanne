
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { RSVPFormData } from '../types';
import { EVENT_DETAILS } from '../constants';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    phone: '',
    guests: 0,
    message: ''
  });

  // Resetar estado quando o modal fechar
  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setWhatsappUrl('');
      setFormData({
        fullName: '',
        phone: '',
        guests: 0,
        message: ''
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Preparar mensagem do WhatsApp
    const whatsappNumber = "556292649828"; // Número 62 9264-9828 formatado para WhatsApp
    const guestsText = formData.guests === 0 ? "Somente eu" : `Eu + ${formData.guests} acompanhante(s)`;
    const text = `Olá Thauanne! ✨\nConfirmando minha presença no seu aniversário de 18 anos.\n\n👤 *Nome:* ${formData.fullName}\n👥 *Acompanhantes:* ${guestsText}\n💬 *Recado:* ${formData.message || "Sem mensagem adicional"}\n\nMal posso esperar! 🥂`;
    
    const encodedText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;
    
    // Salvar URL para uso no botão de fallback
    setWhatsappUrl(url);

    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Pequeno delay para feedback visual antes de abrir WhatsApp
    setTimeout(() => {
      try {
        if (isMobile) {
          // Em mobile, usar window.location.href funciona melhor
          window.location.href = url;
        } else {
          // Em desktop, tentar window.open primeiro, se falhar usar location.href
          const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
          
          // Se pop-up foi bloqueado, usar location.href como fallback
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = url;
          }
        }
        
        // Atualizar status após tentar abrir
        setStatus('success');
      } catch (error) {
        // Em caso de erro, ainda assim mostrar sucesso e permitir tentar novamente
        console.error('Erro ao abrir WhatsApp:', error);
        setStatus('success');
      }
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto modal-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.2)] overflow-hidden paper-texture my-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-300 hover:text-[#0F172A] transition-colors z-10 p-2 -m-2 touch-manipulation"
              aria-label="Fechar"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="p-5 sm:p-8 md:p-10">
              {status === 'success' ? (
                <div className="text-center py-4 sm:py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center mb-4 sm:mb-6"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0F172A]/5 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={40} className="sm:w-14 sm:h-14 text-[#0F172A]" />
                    </div>
                  </motion.div>
                  <h3 className="font-cinzel text-xl sm:text-2xl text-[#0F172A] mb-2 sm:mb-3 font-bold uppercase tracking-wider">Tudo Pronto!</h3>
                  <p className="font-montserrat text-gray-500 text-xs sm:text-sm leading-relaxed px-2 mb-4">
                    Sua confirmação foi preparada para o WhatsApp. Se a conversa não abriu automaticamente, clique no botão abaixo para concluir o envio.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        // Garantir que abre o WhatsApp
                        if (whatsappUrl) {
                          window.location.href = whatsappUrl;
                        }
                      }}
                      className="block w-full py-3 sm:py-4 bg-[#25D366] text-white rounded-full font-montserrat font-bold tracking-[0.3em] hover:bg-[#20BA5A] active:bg-[#20BA5A] transition-colors text-[10px] sm:text-[11px] touch-manipulation min-h-[44px] text-center"
                    >
                      ABRIR WHATSAPP
                    </a>
                    <button 
                      onClick={onClose}
                      className="w-full py-3 sm:py-4 bg-[#0F172A] text-white rounded-full font-montserrat font-bold tracking-[0.3em] hover:bg-[#1e293b] active:bg-[#1e293b] transition-colors text-[10px] sm:text-[11px] touch-manipulation min-h-[44px]"
                    >
                      FECHAR
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-cinzel text-2xl sm:text-3xl text-center text-[#0F172A] mb-1 sm:mb-2 font-bold uppercase tracking-widest">RSVP</h2>
                  <p className="font-montserrat text-center text-[9px] sm:text-[10px] text-[#94A3B8] mb-6 sm:mb-10 uppercase tracking-[0.4em] font-bold">Confirmação de Presença</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block font-montserrat text-[9px] sm:text-[10px] uppercase text-[#64748B] mb-1.5 sm:mb-2 tracking-[0.2em] font-bold">Nome Completo</label>
                      <input 
                        required
                        type="text"
                        className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 sm:p-4 outline-none focus:border-[#0F172A] transition-colors font-montserrat text-sm sm:text-base min-h-[44px] touch-manipulation"
                        placeholder="Nome e Sobrenome"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        autoComplete="name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block font-montserrat text-[9px] sm:text-[10px] uppercase text-[#64748B] mb-1.5 sm:mb-2 tracking-[0.2em] font-bold">WhatsApp</label>
                        <input 
                          required
                          type="tel"
                          inputMode="tel"
                          className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 sm:p-4 outline-none focus:border-[#0F172A] transition-colors font-montserrat text-sm sm:text-base min-h-[44px] touch-manipulation"
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label className="block font-montserrat text-[9px] sm:text-[10px] uppercase text-[#64748B] mb-1.5 sm:mb-2 tracking-[0.2em] font-bold">Acompanhantes</label>
                        <select 
                          className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 sm:p-4 outline-none focus:border-[#0F172A] transition-colors font-montserrat text-sm sm:text-base appearance-none min-h-[44px] touch-manipulation"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                        >
                          <option value={0}>Somente eu</option>
                          <option value={1}>+1</option>
                          <option value={2}>+2</option>
                          <option value={3}>+3</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-montserrat text-[9px] sm:text-[10px] uppercase text-[#64748B] mb-1.5 sm:mb-2 tracking-[0.2em] font-bold">Mensagem Especial</label>
                      <textarea 
                        className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 sm:p-4 outline-none focus:border-[#0F172A] transition-colors font-montserrat text-sm sm:text-base h-20 sm:h-24 resize-none touch-manipulation"
                        placeholder="Mande um recado..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 sm:py-5 bg-[#0F172A] text-white rounded-full font-montserrat font-bold tracking-[0.3em] sm:tracking-[0.4em] shadow-xl hover:bg-[#1e293b] active:bg-[#1e293b] transition-all flex items-center justify-center text-[10px] sm:text-[11px] mt-3 sm:mt-4 min-h-[50px] touch-manipulation disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                          <span>ENVIANDO...</span>
                        </>
                      ) : 'CONFIRMAR AGORA'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
