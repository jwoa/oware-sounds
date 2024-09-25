// src/components/AnimatedSeed.tsx
import React, { useEffect, useState } from 'react';

interface AnimatedSeedProps {
  startPot: number;
  endPot: number;
  onAnimationComplete: () => void;
}

export default function AnimatedSeed({ startPot, endPot, onAnimationComplete }: AnimatedSeedProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const startElement = document.getElementById(`pot-${startPot}`);
    const endElement = document.getElementById(`pot-${endPot}`);

    if (startElement && endElement) {
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.top + startRect.height / 2;
      const endX = endRect.left + endRect.width / 2;
      const endY = endRect.top + endRect.height / 2;

      setPosition({ x: startX, y: startY });

      const animationDuration = 500; // ms
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        setPosition({ x: currentX, y: currentY });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          onAnimationComplete();
        }
      };

      requestAnimationFrame(animate);
    }
  }, [startPot, endPot, onAnimationComplete]);

  return (
    <div
      className="absolute w-3 h-3 bg-yellow-600 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}