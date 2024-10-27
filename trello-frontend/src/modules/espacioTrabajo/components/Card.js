import React from "react";

export function Card({ nombre, color = "#8F3F65", onClick }) {
  return (
    <div
      className={`w-48 h-24 rounded p-4 flex items-start justify-start text-white font-bold shadow-md cursor-pointer transition-transform duration-300 hover:brightness-90`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {nombre}
    </div>
  );
}
