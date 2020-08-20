import React from 'react';
import './Panel.css';

export default function Panel({ score, bestScore, isGameOver, onResetClick, pointsForMove }) {
    let resetBtn = (
        <div className="reset-button" onClick={onResetClick}>New Game</div>
    )

    if (isGameOver) {
        resetBtn = (
            <div className="reset-button game-over" onClick={onResetClick}>
                <span className="game-over-text">Game Over</span>
                <span className="reset-text">New Game</span>
            </div>
        )
    }

    return (
        <div className="panel">
            <div className="title">2048</div>
            <div className="scores-container">
                <div className="score">
                    <span>SCORE</span>
                    <span className="number">{score}</span>
                    {
                        pointsForMove 
                        ? <span key={score} className="additional-points">{`+${pointsForMove}`}</span>
                        : null
                    }
                </div>
                <div className="score">
                    <span>BEST</span>
                    <span className="number">{bestScore}</span>
                </div>
            </div>
            <div className="game-rule">Use the <b>ARROW</b> keys to merge the tiles and see if you can get to <b>2048</b>!</div>
            {resetBtn}
        </div>
    )
}