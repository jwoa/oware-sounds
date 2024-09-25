// src/components/GameBoard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Pot from './Pot';

const INITIAL_SEEDS = 4;
const POTS_PER_PLAYER = 6;
const TOTAL_POTS = POTS_PER_PLAYER * 2;
const TOTAL_SEEDS = INITIAL_SEEDS * TOTAL_POTS;

export default function GameBoard() {
  const [board, setBoard] = useState<number[]>(Array(TOTAL_POTS).fill(INITIAL_SEEDS));
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [highlightedPot, setHighlightedPot] = useState<number | null>(null);

  const checkGameOver = (newScores: [number, number]) => {
    if (newScores[0] > TOTAL_SEEDS / 2 || newScores[1] > TOTAL_SEEDS / 2) {
      setGameOver(true);
    }
  };

  const distributeSeeds = async (startIndex: number) => {
    const newBoard = [...board];
    let seeds = newBoard[startIndex];
    newBoard[startIndex] = 0;
    let currentIndex = startIndex;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    while (seeds > 0) {
      currentIndex = (currentIndex - 1 + TOTAL_POTS) % TOTAL_POTS; // Move counterclockwise
      if (currentIndex !== startIndex) {
        setHighlightedPot(currentIndex);
        await delay(300); // Adjust this value to change the speed of distribution
        newBoard[currentIndex]++;
        seeds--;
        setBoard([...newBoard]);
      }
    }

    setHighlightedPot(null);

    // Check for capture
    let captured = 0;
    while (
      currentIndex >= POTS_PER_PLAYER * (1 - currentPlayer) &&
      currentIndex < POTS_PER_PLAYER * (2 - currentPlayer) &&
      (newBoard[currentIndex] === 2 || newBoard[currentIndex] === 3)
    ) {
      captured += newBoard[currentIndex];
      newBoard[currentIndex] = 0;
      currentIndex = (currentIndex + 1) % TOTAL_POTS; // Move clockwise for capture check
    }

    const newScores: [number, number] = [...scores];
    newScores[currentPlayer] += captured;
    setScores(newScores);
    checkGameOver(newScores);

    setBoard(newBoard);
    setCurrentPlayer(1 - currentPlayer as 0 | 1);
  };

  const handlePotClick = (index: number) => {
    if (gameOver || highlightedPot !== null) return;
    if (index < POTS_PER_PLAYER * currentPlayer || index >= POTS_PER_PLAYER * (currentPlayer + 1)) {
      return; // Can't select opponent's pots
    }

    distributeSeeds(index);
  };

  return (
    <div className="bg-brown-100 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <div>Player 1 Score: {scores[0]}</div>
        <div>Player 2 Score: {scores[1]}</div>
      </div>
      <div className="flex flex-wrap justify-center">
        {board.map((seeds, index) => (
          <Pot 
            key={index}
            seeds={seeds} 
            onClick={() => handlePotClick(index)}
            isPlayerSide={index < POTS_PER_PLAYER ? 0 : 1}
            currentPlayer={currentPlayer}
            isHighlighted={index === highlightedPot}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        {gameOver ? (
          <div className="text-2xl font-bold">
            Game Over! {scores[0] > scores[1] ? 'Player 1' : 'Player 2'} wins!
          </div>
        ) : (
          <div>Current Player: {currentPlayer + 1}</div>
        )}
      </div>
    </div>
  );
}