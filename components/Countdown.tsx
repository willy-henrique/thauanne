
import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../constants';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +EVENT_DETAILS.targetDate - +new Date();
      
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const Unit: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col items-center justify-center bg-white border border-[#0F172A]/5 rounded-2xl py-5 px-3 sm:p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] min-w-[70px] sm:min-w-[100px]">
      <span className="font-cinzel text-xl sm:text-3xl font-bold text-[#0F172A] tracking-tighter text-center">{value}</span>
      <span className="font-montserrat text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mt-2 font-bold text-center">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-[480px]">
        <Unit label="Dias" value={timeLeft.days} />
        <Unit label="Horas" value={timeLeft.hours} />
        <Unit label="Min" value={timeLeft.minutes} />
        <Unit label="Seg" value={timeLeft.seconds} />
      </div>
    </div>
  );
};

export default Countdown;
