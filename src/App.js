import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Panel from './components/Panel/Panel';
import './App.css';

const KEYCODE = {
  Up: 38,
  Down: 40,
  Left: 37,
  Right: 39
}
const BOARD_DIM = 4;

export default function App() {
  const [gameState, setGameState] = useState(generateInitialGame(BOARD_DIM));
  const [score, setScore] = useState(0);

  function handleKeyUp(e) {
    switch (e.keyCode) {
      case KEYCODE.Left:
        moveLeft(); break;
      case KEYCODE.Right:
        moveRight(); break;
      case KEYCODE.Down:
        moveDown(); break;
      case KEYCODE.Up:
        moveUp(); break;
      default:
        return;
    }
  }

  function moveLeft() {
    const newGameState = gameState.slice();
    let isValid = false;
    for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
      let newIdx = 0;
      for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx > 0 && newGameState[rowIdx][newIdx - 1] === val) { // merge
            newIdx--;
            val += val;
            setScore(score + val);
          }
          newGameState[rowIdx][newIdx] = val;
          if (newIdx !== colIdx) {
            newGameState[rowIdx][colIdx] = '';
            isValid = true;
          }
          newIdx++;
        }
      }
    }
    if (isValid) {
      setGameState(randomFill(newGameState));
    }
    return isValid;
  }

  function moveRight() {
    const newGameState = gameState.slice();
    let isValid = false;
    for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
      let newIdx = BOARD_DIM - 1;
      for (let colIdx = BOARD_DIM - 1; colIdx > -1; colIdx--) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx < BOARD_DIM && newGameState[rowIdx][newIdx + 1] === val) { // merge
            newIdx++;
            val += val;
            setScore(score + val);
          }
          newGameState[rowIdx][newIdx] = val;
          if (newIdx !== colIdx) {
            newGameState[rowIdx][colIdx] = '';
            isValid = true;
          }
          newIdx--;
        }
      }
    }
    if (isValid) {
      setGameState(randomFill(newGameState));
    }
    return isValid;
  }

  function moveUp() {
    const newGameState = gameState.slice();
    let isValid = false;
    for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
      let newIdx = 0;
      for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx > 0 && newGameState[newIdx - 1][colIdx] === val) { // merge
            newIdx--;
            val += val;
            setScore(score + val);
          }
          newGameState[newIdx][colIdx] = val;
          if (newIdx !== rowIdx) {
            newGameState[rowIdx][colIdx] = '';
            isValid = true;
          }
          newIdx++;
        }
      }
    }
    if (isValid) {
      setGameState(randomFill(newGameState));
    }
    return isValid;
  }

  function moveDown() {
    const newGameState = gameState.slice();
    let isValid = false;
    for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
      let newIdx = BOARD_DIM - 1;
      for (let rowIdx = BOARD_DIM - 1; rowIdx > -1; rowIdx--) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx < BOARD_DIM - 1 && newGameState[newIdx + 1][colIdx] === val) { // merge
            newIdx++;
            val += val;
            setScore(score + val);
          }
          newGameState[newIdx][colIdx] = val;
          if (newIdx !== rowIdx) {
            newGameState[rowIdx][colIdx] = '';
            isValid = true;
          }
          newIdx--;
        }
      }
    }
    if (isValid) {
      setGameState(randomFill(newGameState));
    }
    return isValid;
  }

  function handleResetClick() {
    setGameState(generateInitialGame(BOARD_DIM));
    setScore(0);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  });

  return (
    <div className="game">
      <Panel score={score} isGameOver={isGameOver(gameState)}
        onResetClick={handleResetClick}>
      </Panel>
      <Board gameState={gameState}></Board>
    </div>
  );
}

// Utility functions \\

function randomFill(gameState) {
  const emptySquares = findEmptySquares(gameState);
  if (!emptySquares.length)
    return gameState;
  let newGameState = gameState.slice();
  const randomNum = Math.floor(Math.random() * (emptySquares.length));
  const [rowIdx, colIdx] = emptySquares[randomNum];
  newGameState[rowIdx][colIdx] = 2; // TODO: provide a more complicated filling strategy
  return newGameState;
}

function generateInitialGame(boardDimension) {
  let gameState = Array(boardDimension);
  for (let i = 0; i < gameState.length; i++) {
    gameState[i] = Array(boardDimension).fill('');
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

function isGameOver(gameState) {
  if (!gameState)
    return true;
  for (let row of gameState) {
    for (let square of row) {
      if (!square) 
        return false;
    }
  }
  return true;
}
