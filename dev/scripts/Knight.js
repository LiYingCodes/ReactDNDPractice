// MAKING KNIGHT A DRAG SOURCE. 
// KNIGHT CAN BE MOVED BUT CAN'T STAY AT SOMEWHER ELSE YET. 
// NOW WE MAKE SQUARE A HOUSE KNIGHT CAN MOVE TO
import React from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from "./Constants";

//SPEC
const knightSource = {
    beginDrag(props) {
        return {};
    }
};

// COLLECT: create dragging function
// connect parameter shows where to drag from (dragSource)
// monitor parameter shows what to display when piece is dragged (isDragging)
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

class Knight extends React.Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    // this.props.connectDragSource = connectDragSource
    // this.props.isDragging = isDragging
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          // ternary operator to toggle opacity
          fontSize: 100,
          fontWeight: "bold",
          cursor: "move"
        }}
      >
        ♘
      </div>
    );
  }

    componentDidMount() {
        const img = new Image();
        img.src = 'horse.png';
        img.onload = () => this.props.connectDragPreview(img);
    }
}
// export default DnDComponent(Who, how, where & what)(myOwnComponent)

// export default DragSource(TYPE, SPEC & COLLECT)(COMPONENT)

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
