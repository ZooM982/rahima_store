import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white hover:shadow-lg hover:scale-105",
    secondary: "border-2 border-text-main hover:bg-text-main hover:text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
