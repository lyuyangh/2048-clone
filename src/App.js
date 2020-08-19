import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import './App.css';

export default function App() {
  const [gameState, setGameState] = useState(generateInitialGame());
  console.log(gameState);

  function handleKeyPress(e) {

  }

  return (
    <div className="game" onKeyUp={handleKeyPress}>
      {/* <Panel gameState={gameState}></Panel> */}
      <Board gameState={gameState}></Board>
    </div>
  );
}

function randomFill(gameState) {
  const emptySquares = findEmptySquares(gameState);
  if (!emptySquares.length)
    return;
  let newGameState = gameState.slice();
  const randomNum = Math.floor(Math.random() * (emptySquares.length + 1));
  const [rowIdx, colIdx] = emptySquares[randomNum];
  newGameState[rowIdx][colIdx] = 2; // TODO: provide a more complicated filling strategy
  return newGameState;
}

function generateInitialGame() {
  let gameState = Array(4);
  for (let i = 0; i < gameState.length; i++) {
    gameState[i] = Array(4).fill('');
  }
  gameState = randomFill(gameState);
  return randomFill(gameState);
}

function findEmptySquares(gameState) {
  let emptySquares = [];
  for (let rowIdx = 0; rowIdx < gameState.length; rowIdx++) {
    for (let colIdx = 0; colIdx < gameState[0].length; colIdx++) {
      if (!gameState[rowIdx][colIdx])
        emptySquares.push([rowIdx, colIdx]);
    }
  }
  return emptySquares;
}
