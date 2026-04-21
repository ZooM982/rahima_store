import React from 'react';

const SectionHeader = ({ subtitle, title, alignment = 'left' }) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : ''}`}>
      <span className="text-primary font-semibold uppercase tracking-widest text-sm whitespace-nowrap">
        {subtitle}
      </span>
      <h2 className={`text-5xl mt-4 font-serif ${isCenter ? 'italic' : ''}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
