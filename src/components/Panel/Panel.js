import React from 'react';
import './Panel.css';

export default function Panel({score, isGameOver, onResetClick}) {
    return (
        <div className="panel">
            <div className="score">Score: {score}</div>
            <button className="reset-button" onClick={onResetClick}>
                {isGameOver ? 'Game Over' : 'Reset Game'}
            </button>
        </div>
    )
}