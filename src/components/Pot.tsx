// src/components/Pot.tsx
import React from 'react';

interface PotProps {
  seeds: number;
  onClick: () => void;
  isPlayerSide: 0 | 1;
  currentPlayer: 0 | 1;
  isHighlighted: boolean;
}

export default function Pot({ seeds, onClick, isPlayerSide, currentPlayer, isHighlighted }: PotProps) {
  const getBorderColor = () => {
    if (isPlayerSide === 0) return 'border-yellow-400';
    if (isPlayerSide === 1) return 'border-orange-400';
    return '';
  };

  return (
    <div 
      className={`w-24 h-24 m-2 rounded-full flex items-center justify-center cursor-pointer
        border-4 ${getBorderColor()}
        ${isHighlighted ? 'bg-green-300' : 'bg-brown-300'}`}
      onClick={onClick}
    >
      <span className="text-2xl font-bold">{seeds}</span>
    </div>
  );
}