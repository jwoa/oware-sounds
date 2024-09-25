// src/app/page.tsx
import React from 'react'
import GameBoard from '../components/GameBoard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Oware Game</h1>
      <GameBoard />
    </main>
  )
}