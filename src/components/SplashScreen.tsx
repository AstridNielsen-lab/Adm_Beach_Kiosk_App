import React, { useEffect, useState } from 'react';
import { UmbrellaIcon } from 'lucide-react';
import { AnimatedText } from './AnimatedText';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500); // Aguarda a animação de saída terminar
    }, 2500); // Tempo total da splash screen

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-blue-500 flex items-center justify-center transition-opacity duration-500 z-50 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-white text-center">
        <UmbrellaIcon 
          size={64} 
          className="mx-auto mb-4 animate-[bounce_2s_ease-in-out_infinite]" 
        />
        <AnimatedText
          text="Beach Kiosk"
          className="text-4xl font-bold"
        />
      </div>
    </div>
  );
}