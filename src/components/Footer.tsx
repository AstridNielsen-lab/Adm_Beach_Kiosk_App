import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm leading-relaxed">
          Este sistema foi desenvolvido pelos programadores Full Stack Marcelo Oliveira e Julio Campos Machado, 
          da empresa Like Look Solutions.
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 text-sm">
          <a 
            href="https://wa.me/5511992946628" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp +55 11 99294-6628
          </a>
          <span>|</span>
          <a 
            href="https://likelook.wixsite.com/solutions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Site: likelook.wixsite.com/solutions
          </a>
        </div>
      </div>
    </footer>
  );
}