// src/components/ui/button.jsx
import React from 'react';

export function Button({ children, variant = 'primary', ...props }) {
  let baseClasses = "py-2 px-4 rounded focus:outline-none";
  if (variant === 'secondary') {
    baseClasses += " bg-gray-700 text-white hover:bg-gray-600";
  } else {
    baseClasses += " bg-blue-600 text-white hover:bg-blue-500";
  }
  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
