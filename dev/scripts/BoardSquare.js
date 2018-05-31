import React from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from "./Game";
import { ItemTypes } from "./Constants";
import { DropTarget } from 'react-dnd';

//SPEC
//identifying where piece can drop
const squareTarget = {
    canDrop(props) {
        return canMoveKnight(props.x, props.y);
    }, //highlights area that can be dropped at

    drop(props, monitor) {
        moveKnight(props.x, props.y);
    }
};

// COLLECT function for board
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop() //highlights area that can be dropped
    };
}

class BoardSquare extends React.Component {
    renderOverlay(color) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: color,
            }} />
        );
    }
    
    render(){
        const {x, y, connectDropTarget, isOver, canDrop} = this.props;
        // declaring the key-value pairs from above in here so that it is available to be used
        const black = (x + y) % 2 === 1;

        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Square black={black}>
                    {this.props.children}
                </Square>
                {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')}
                }
            </div>
            )
        }
} 

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);

//higher ordered function that takes all the values above (what, where and how) and returns my own component (BoardSquare) decorated with these things.
