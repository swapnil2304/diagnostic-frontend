// src/components/ui/input.jsx
import React from 'react';

export function Input({ ...props }) {
  return (
    <input
      className="border border-gray-500 rounded px-2 py-1 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
      {...props}
    />
  );
}
