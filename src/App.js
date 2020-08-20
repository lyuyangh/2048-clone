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
  const [gameState, setGameState] = useLocalStorage('gameState', generateInitialGame(BOARD_DIM));
  const [score, setScore] = useLocalStorage('score', 0);
  const [bestScore, setBestScore] = useLocalStorage('bestScore', 0);
  const [pointsForMove, setPointsForMove] = useState(0);

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
    let pointsForMove = 0;
    for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
      let newIdx = 0;
      for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx > 0 && newGameState[rowIdx][newIdx - 1] === val) { // merge
            newIdx--;
            val += val;
            pointsForMove += val;
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
      setPointsForMove(pointsForMove);
      setScore(score + pointsForMove);
      setGameState(randomFill(newGameState));
    }
  }

  function moveRight() {
    const newGameState = gameState.slice();
    let isValid = false;
    let pointsForMove = 0;
    for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
      let newIdx = BOARD_DIM - 1;
      for (let colIdx = BOARD_DIM - 1; colIdx > -1; colIdx--) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx < BOARD_DIM && newGameState[rowIdx][newIdx + 1] === val) { // merge
            newIdx++;
            val += val;
            pointsForMove += val
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
      setPointsForMove(pointsForMove);
      setScore(score + pointsForMove);
      setGameState(randomFill(newGameState));
    }
  }

  function moveUp() {
    const newGameState = gameState.slice();
    let isValid = false;
    let pointsForMove = 0;
    for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
      let newIdx = 0;
      for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx > 0 && newGameState[newIdx - 1][colIdx] === val) { // merge
            newIdx--;
            val += val;
            pointsForMove += val;
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
      setPointsForMove(pointsForMove);
      setScore(score + pointsForMove);
      setGameState(randomFill(newGameState));
    }
  }

  function moveDown() {
    const newGameState = gameState.slice();
    let isValid = false;
    let pointsForMove = 0;
    for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
      let newIdx = BOARD_DIM - 1;
      for (let rowIdx = BOARD_DIM - 1; rowIdx > -1; rowIdx--) {
        let val = newGameState[rowIdx][colIdx];
        if (val) {
          if (newIdx < BOARD_DIM - 1 && newGameState[newIdx + 1][colIdx] === val) { // merge
            newIdx++;
            val += val;
            pointsForMove += val;
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
      setPointsForMove(pointsForMove);
      setScore(score + pointsForMove);
      setGameState(randomFill(newGameState));
    }
  }

  function calcIsGameOver() {
    if (!gameState) {
      console.log(`isGameOver() is passed an invalid argument of: ${gameState}`);
      return true;
    }
    // check if any square is empty or if two consecutive squares have the same number
    for (let row of gameState) {
      let prev = undefined;
      for (let square of row) {
        if (prev !== undefined && (!square || prev === square))
          return false;
        prev = square
      }
    }
    for (let colIdx = 0; colIdx < BOARD_DIM; colIdx++) {
      let prev = undefined;
      for (let rowIdx = 0; rowIdx < BOARD_DIM; rowIdx++) {
        const square = gameState[rowIdx][colIdx];
        if (prev !== undefined && (!square || prev === square))
          return false;
        prev = square;
      }
    }
    if (score > bestScore)
      setBestScore(score);
    return true;
  }

  function handleResetClick() {
    setGameState(generateInitialGame(BOARD_DIM));
    setScore(0);
    setPointsForMove(0);
    if (score > bestScore)
      setBestScore(score);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  });

  const isGameOver = calcIsGameOver();

  return (
    <div className="game">
      <Board gameState={gameState} isGameOver={isGameOver}></Board>
      <Panel score={score} pointsForMove={pointsForMove} 
        bestScore={bestScore} isGameOver={isGameOver}
        onResetClick={handleResetClick}>
      </Panel>
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
  const randomNum2 = Math.random();
  newGameState[rowIdx][colIdx] = randomNum2 > 0.8 ? 4 : 2; 
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

// Custom Hooks \\
function useLocalStorage(key, initValue) {
  const val = window.localStorage.getItem(key);
  const [value, setValue] = useState(val ? JSON.parse(val) : initValue);

  function setLocalStorageVal(val) {
    setValue(val);
    try {
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.log(e);
    }
  }
  return [value, setLocalStorageVal];
}
