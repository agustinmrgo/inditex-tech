import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { reorder, reorderRows } from "../../utils/reorder";

export const RowsContainer = () => {
  const [rows, setRows] = useState([
    { id: "row1", productIds: ["product1", "product2"] },
    { id: "row2", productIds: ["product3"] },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([
    { id: "product1", content: "Product 1" },
    { id: "product2", content: "Product 2" },
    { id: "product3", content: "Product 3" },
  ]);

  // eslint-disable-next-line no-unused-vars
  const handleDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) {
      return;
    }

    if (type === "row") {
      const newRows = reorderRows(rows, source, destination);
      setRows(newRows);
      return;
    }

    const start = rows[source.droppableId];
    const finish = rows[destination.droppableId];

    if (start === finish) {
      const newProductIds = Array.from(start.productIds);
      newProductIds.splice(source.index, 1);
      newProductIds.splice(destination.index, 0, draggableId);

      const newRows = {
        ...start,
        productIds: newProductIds,
      };

      setRows(newRows);
      return;
    }

    // Moving from one list to another
    const startProductIds = Array.from(start.productIds);
    startProductIds.splice(source.index, 1);
    const newStart = {
      ...start,
      productIds: startProductIds,
    };

    const finishProductIds = Array.from(finish.productIds);
    finishProductIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      productIds: finishProductIds,
    };

    setRows({
      ...rows,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  console.log("ROWS", rows);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }
        setRows(reorder(rows, source, destination));
      }}
      // onDragEnd={handleDragEnd}
    >
      <Droppable droppableId="products-board" type="row" direction="vertical">
        {(dropRowProvided) => (
          <div
            ref={dropRowProvided.innerRef}
            {...dropRowProvided.droppableProps}
          >
            {rows.map((row, index) => (
              <Draggable key={row.id} draggableId={row.id} index={index}>
                {(dragRowProvided) => (
                  <div
                    ref={dragRowProvided.innerRef}
                    {...dragRowProvided.draggableProps}
                    {...dragRowProvided.dragHandleProps}
                  >
                    <h3>{row.id}</h3>

                    <Droppable
                      droppableId={row.id}
                      type="product"
                      direction="horizontal"
                    >
                      {(dropProductsProvided) => (
                        <div
                          ref={dropProductsProvided.innerRef}
                          {...dropProductsProvided.draggableProps}
                        >
                          {row.productIds.map((productId, index) => {
                            const product = products.find(
                              (product) => product.id === productId
                            ) || {
                              id: "not-found",
                              content: "Product not found",
                            };
                            return (
                              <Draggable
                                key={product.id}
                                draggableId={product.id}
                                index={index}
                              >
                                {(dragProductProvided) => (
                                  <div
                                    ref={dragProductProvided.innerRef}
                                    {...dragProductProvided.draggableProps}
                                    {...dragProductProvided.dragHandleProps}
                                  >
                                    <p>{product.content}</p>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {dropProductsProvided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}

            {dropRowProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
