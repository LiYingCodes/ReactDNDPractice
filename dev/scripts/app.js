import React from 'react';
import ReactDOM from 'react-dom';
import { observe } from './Game';
import Board from './Board'

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    document.getElementById("app")
  )
);