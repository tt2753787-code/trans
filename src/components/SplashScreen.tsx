import React, { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 1100);

    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      onClick={() => setVisible(false)}
      className={`fixed inset-0 z-[99999] bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-400 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-24 h-24 rounded-3xl bg-[#eab308] flex items-center justify-center shadow-[0_10px_35px_rgba(234,179,8,0.4)] rotate-3">
          <span className="font-chivo font-black text-4xl text-[#0f172a] tracking-tighter">NG</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
          <Truck className="w-4 h-4 text-[#0f172a]" />
        </div>
      </div>

      <h1 className="text-3xl font-chivo font-black text-white tracking-wider flex items-center gap-2">
        NEXT GEN{' '}
        <span className="text-[#eab308] text-xs px-2.5 py-0.5 rounded-lg bg-[#eab308]/20 font-black border border-[#eab308]/40">
          المغرب
        </span>
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm mt-1.5 font-bold">
        حلول النقل، الكوليكط، والتوصيل السريع
      </p>

      <div className="mt-8 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#eab308] animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-[#eab308] animate-bounce [animation-delay:0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-[#eab308] animate-bounce [animation-delay:0.3s]"></div>
      </div>
    </div>
  );
};
