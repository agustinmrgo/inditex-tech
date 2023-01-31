import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RowHeader } from "../RowHeader/RowHeader";
import { reorder } from "../../utils/reorder";
import "./RowsContainer.css";

export const RowsContainer = () => {
  const [rows, setRows] = useState([
    { id: "row1", productIds: ["product1", "product2"] },
    { id: "row2", productIds: ["product3"] },
  ]);
  const [products] = useState([
    { id: "product1", content: "Product 1" },
    { id: "product2", content: "Product 2" },
    { id: "product3", content: "Product 3" },
  ]);

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    // return if there's no destination
    if (!destination) return;

    // return if source and destination are the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "row") {
      const reorderRows = reorder(
        Array.from(rows),
        source.index,
        destination.index
      );
      setRows(reorderRows);
    }

    if (source.droppableId === destination.droppableId) {
      const sourceRow = rows.find((row) => row.id === source.droppableId);
      const reorderedProductIds = reorder(
        sourceRow.productIds,
        source.index,
        destination.index
      );
      sourceRow.productIds = [...reorderedProductIds];
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceRow = rows.find((row) => row.id === source.droppableId);
      const destinationRow = rows.find(
        (row) => row.id === destination.droppableId
      );
      const item = sourceRow.productIds.splice(source.index, 1)[0];
      destinationRow.productIds.splice(destination.index, 0, item);
    }
  };

  const handleAddRow = (event) => {
    console.log("EVENT", event);
  };

  return (
    <>
      <button onClick={handleAddRow}>+ Add row</button>
      <DragDropContext onDragEnd={handleDragEnd}>
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
                      <RowHeader row={row} />
                      <Droppable
                        droppableId={row.id}
                        type="product"
                        direction="horizontal"
                      >
                        {(dropProductsProvided) => (
                          <div
                            ref={dropProductsProvided.innerRef}
                            {...dropProductsProvided.draggableProps}
                            style={{ display: "flex", margin: "10px 0 20px" }}
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
                                      className="row-item"
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
              <Draggable
                key="new-row"
                draggableId="new-row"
                index={rows.length + 1}
              >
                {(dragRowProvided) => (
                  <div
                    className="new-row-drop-zone"
                    ref={dragRowProvided.innerRef}
                    {...dragRowProvided.draggableProps}
                    {...dragRowProvided.dragHandleProps}
                  >
                    <p>Drop product to add new row</p>
                  </div>
                )}
              </Draggable>

              {dropRowProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
