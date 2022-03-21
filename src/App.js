import { getValue } from '@testing-library/user-event/dist/utils';
import React from 'react';

import Tetris from './components/Tetris'

const App = () => {

  const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

  function drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };


  return (
    <div className="App">
      <Tetris draw={drawMatrix} />
    </div>);
}
export default App;