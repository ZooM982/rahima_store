/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/pictogram-gold.svg';

const SplashScreen = ({ finishLoading }) => {
  const [text, setText] = useState('');
  const fullText = "L'excellence de la beauté africaine...";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);

    const timer = setTimeout(() => {
      finishLoading();
    }, 3500); // 3.5 seconds total (3s + some buffer for transition)

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [finishLoading]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gold-gradient p-[2px]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-4">
            <img 
              src={logo} 
              alt="Rahima Store" 
              className="w-full h-full object-contain p-6"
            />
          </div>
        </div>
        
        {/* Animated Rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 border border-primary/30 rounded-full -m-4"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 border border-primary/20 rounded-full -m-8"
        />
      </motion.div>

      <div className="text-center">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif italic text-gold-gradient mb-4 tracking-tight"
        >
          Rahima Store
        </motion.h1>
        
        <div className="h-6">
          <p className="text-white/40 text-sm md:text-base font-light tracking-[0.2em] uppercase">
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-[1px] h-4 bg-primary ml-1"
            />
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 3, ease: "linear" }}
          className="w-full h-full bg-gold-gradient"
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
