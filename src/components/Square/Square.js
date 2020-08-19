import React from 'react';
import './Square.css';

export default function Square(props) {
    const fontSize = `${90 / props.value.toString().length}px`;
    return (
        <div className="square" style={{fontSize: fontSize}}>{props.value}</div>
    );
}