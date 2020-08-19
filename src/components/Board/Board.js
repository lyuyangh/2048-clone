import React from 'react';
import Square from '../Square/Square';
import './Board.css';

export default function Board({gameState}) {

    return (
        <div className="board">
            {gameState.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>{row.map((square, colIdx) => (
                    <Square value={row[colIdx]} key={colIdx}></Square>
                ))}</div>
            ))}
        </div>
    )
}