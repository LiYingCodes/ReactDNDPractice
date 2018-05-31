import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {canMoveKnight, moveKnight} from './Game';
import Knight from './Knight';
import BoardSquare from './BoardSquare'

class Board extends React.Component {
    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight />;
        }
    }

    //function to create the alternative black and white boxes in an 8 by 8 grid
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
            <div
                key={i}
                className="squares">
                    <BoardSquare x={x} y={y}>
                        {this.renderPiece(x,y)}
                    </BoardSquare>
            </div>
        )
    }
    //go over function 64 times, push into an array
    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        //display squares array
        return (
            <div className="flexboard">
                {squares}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);
