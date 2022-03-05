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

  let keyCode = 0;

  function keyInput({ _keyCode }) {
    console.log(_keyCode);
    keyCode = _keyCode;
  }


  return (
    <div className="App">
      <Tetris draw={drawMatrix} onKeyDown={e => keyInput(e)} keyCode={keyCode}/>
    </div>);
}
export default App;