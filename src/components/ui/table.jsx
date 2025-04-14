import React from "react";

// Basic Table component
export function Table({ children, className = "" }) {
  return <table className={`min-w-full border-collapse ${className}`}>{children}</table>;
}

// Table header wrapper
export function TableHeader({ children, className = "" }) {
  return <thead className={`bg-gray-700 text-white ${className}`}>{children}</thead>;
}

// Table body wrapper
export function TableBody({ children, className = "" }) {
  return <tbody className={`bg-gray-800 text-white ${className}`}>{children}</tbody>;
}

// Table row component
export function TableRow({ children, className = "" }) {
  return <tr className={`border-b border-gray-600 ${className}`}>{children}</tr>;
}

// Table cell component
export function TableCell({ children, className = "" }) {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}

// Table head cell component
export function TableHead({ children, className = "" }) {
  return <th className={`px-4 py-2 font-semibold ${className}`}>{children}</th>;
}
