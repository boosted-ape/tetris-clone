import React from 'react';

import Tetris from './components/Tetris'

const App = () => {

  function drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = 'red';
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };


  return (
    <div className="App">
      <Tetris draw={drawMatrix} 
      tabIndex="0" 
      onKeyDown={(e) => console.log(e.keyCode)} />
    </div>);
}
export default App;