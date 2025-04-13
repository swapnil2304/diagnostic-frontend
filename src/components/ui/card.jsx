// src/components/ui/card.jsx
import React from 'react';

// A basic Card component using Tailwind classes for a dark-themed style
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-900 rounded-md shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

// A basic CardContent component
export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
