import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import App from './App';
import Board from './components/Board/Board';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders game board', () => {
  const mockGameState = [[1, 2, 3], [1, 2, 3]];
  act(() => {
    render(<Board gameState={mockGameState} />, container);
  });
  const board = container.children[0];
  expect(board.textContent).toEqual('123123');
  expect(board.children.length).toEqual(2);
  expect(board.children[0].children.length).toEqual(3);
});

it ('init game state', () => {
  act(() => {
    render(<App />, container)
  });
  const app = container.children[0];
  const [panel, board] = app.children;
  expect(panel.children[0].textContent).toEqual('Score: 0');
  expect(board.textContent).toEqual('22');
})
