import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Row = () => (
  <>
    <p>NAME</p>
    <p>$PRICE</p>
  </>
);

export const RowsContainer = () => {
  return <div>HOLA!</div>;
  // const [count, setCount] = useState(0)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: getItems(6),
  //   };
  //   this.onDragEnd = this.onDragEnd.bind(this);
  // }

  // const onDragEnd = (result) => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   const items = reorder(
  //     this.state.items,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   this.setState({
  //     items,
  //   });
  // };

  // return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <Droppable droppableId="droppable" direction="horizontal">
  //       {(provided, snapshot) => (
  //         <div
  //           ref={provided.innerRef}
  //           style={getListStyle(snapshot.isDraggingOver)}
  //           {...provided.droppableProps}
  //         >
  //           {this.state.items.map((item, index) => (
  //             <Draggable key={item.id} draggableId={item.id} index={index}>
  //               {(provided, snapshot) => (
  //                 <div
  //                   ref={provided.innerRef}
  //                   {...provided.draggableProps}
  //                   {...provided.dragHandleProps}
  //                   style={getItemStyle(
  //                     snapshot.isDragging,
  //                     provided.draggableProps.style
  //                   )}
  //                 >
  //                   {item.content}
  //                 </div>
  //               )}
  //             </Draggable>
  //           ))}
  //           {provided.placeholder}
  //         </div>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // );
};
