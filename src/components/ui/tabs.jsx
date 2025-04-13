// src/components/ui/tabs.jsx
import React, { useState } from 'react';

export function Tabs({ children, defaultValue = "", className = "" }) {
  const [activeValue, setActiveValue] = useState(defaultValue);
  // Pass activeValue and setActiveValue down to children:
  return React.Children.map(children, child =>
    React.cloneElement(child, { activeValue, setActiveValue })
  );
}

export function TabsList({ children, activeValue, setActiveValue, className = "" }) {
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeValue, setActiveValue })
      )}
    </div>
  );
}

export function TabsTrigger({ children, value, activeValue, setActiveValue, className = "" }) {
  const isActive = activeValue === value;
  return (
    <button
      className={`${className} ${isActive ? "bg-gray-800 text-white" : "bg-gray-700 text-gray-400"} px-4 py-2`}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeValue, className = "" }) {
  return activeValue === value ? (
    <div className={className}>{children}</div>
  ) : null;
}
