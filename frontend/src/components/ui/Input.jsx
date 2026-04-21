import React from 'react';

const Input = ({ label, type = 'text', textarea = false, autoComplete, ...props }) => {
  const baseClasses = "w-full px-5 py-3.5 rounded-2xl bg-bg-soft border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm";

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">{label}</label>}
      {textarea ? (
        <textarea className={`${baseClasses} min-h-[120px]`} autoComplete={autoComplete} {...props} />
      ) : (
        <input type={type} className={baseClasses} autoComplete={autoComplete} {...props} />
      )}
    </div>
  );
};

export default Input;
