import React from 'react';
import Square from '../Square/Square';
import './Board.css';

export default function Board({gameState, isGameOver}) {

    return (
        <div className="board" style={{opacity: isGameOver ? 0.6 : 1}}>
            {gameState.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>{row.map((square, colIdx) => (
                    <Square value={row[colIdx]} key={colIdx}></Square>
                ))}</div>
            ))}
        </div>
    )
}