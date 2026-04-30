import React from 'react';
import logo from '../../assets/pictogram-gold.svg';

const DecorativePictogram = ({ className = '', size = 'w-64 h-64', opacity = 'opacity-[0.1]', absolute = true }) => {
  return (
    <div className={`${absolute ? 'absolute' : 'relative'} pointer-events-none select-none ${opacity} ${className}`}>
      <img src={logo} alt="" className={`${size} object-contain`} aria-hidden="true" />
    </div>
  );
};

export default DecorativePictogram;
