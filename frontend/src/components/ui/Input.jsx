import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, type = 'text', textarea = false, autoComplete, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const baseClasses = "w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-sm text-white placeholder:text-gray-600";

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-2">{label}</label>}
      <div className="relative">
        {textarea ? (
          <textarea 
            className={`${baseClasses} min-h-[120px]`} 
            autoComplete={autoComplete} 
            {...props} 
          />
        ) : (
          <>
            <input 
              type={inputType} 
              className={`${baseClasses} ${isPassword ? 'pr-12' : ''}`} 
              autoComplete={autoComplete} 
              {...props} 
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
