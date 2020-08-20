import React from 'react';
import './Square.css';

const COLOR = {
    2: '#f9bb81',
    4: '#f4ab90',
    8: '#ea978a',
    16: '#d8716a',
    32: '#cc514f',
    64: '#d1306d',
    128: '#a51c60',
    256: '#f76f3d',
    512: '#d67124',
    1024: '#f4bf38',
    2056: '#ed0b0b',
    empty: '#ededed'
}

export default function Square({ value }) {
    const fontSize = `${90 / value.toString().length}px`;
    const color = COLOR[value] || COLOR['empty'];

    return (
        <div className="square" style={{ fontSize: fontSize, backgroundColor: color }}>
            {value}
        </div>
    );
}