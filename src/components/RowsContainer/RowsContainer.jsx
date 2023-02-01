import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Snackbar from "@mui/material/Snackbar";

import { RowHeader } from "../RowHeader/RowHeader";
import { reorder, reorderRows } from "../../utils/reorder";
import "./RowsContainer.css";

export const RowsContainer = () => {
  const [rows, setRows] = useState([
    {
      id: "row1",
      productIds: ["product1", "product2", "product3"],
    },
    { id: "row2", productIds: ["product4", "product5", "product6"] },
  ]);
  const [products, setProducts] = useState([
    { id: "product1", content: "Product 1" },
    { id: "product2", content: "Product 2" },
    { id: "product3", content: "Product 3" },
    { id: "product4", content: "Product 4" },
    { id: "product5", content: "Product 5" },
    { id: "product6", content: "Product 6" },
  ]);
  // const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDragEnd = ({ destination, source, type }) => {
    // return if there's no destination
    if (!destination) return;

    // return if source and destination are the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let reorderedRows = [];
    // move rows themselves
    if (type === "row") {
      reorderedRows = reorder(
        Array.from(rows),
        source.index,
        destination.index
      );
    }
    // move products within a row and between rows
    if (type === "product") {
      reorderedRows = reorderRows(rows, source, destination);
    }
    setRows(reorderedRows);
  };

  const handleAddRow = () => {
    const newProduct = {
      id: `product${products.length + 1}`,
      content: `Product ${products.length + 1}`,
    };
    setProducts([...products, { ...newProduct }]);
    setRows([
      ...rows,
      {
        id: `row${rows.length + 1}`,
        productIds: [newProduct.id],
      },
    ]);
  };

  const handleDeleteRow = (rowId) => {
    const newRows = rows.filter((row) => row.id !== rowId);
    setRows(newRows);
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
                      <RowHeader
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
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

              {/* <Draggable
                key="new-row"
                draggableId="new-row"
                index={rows.length}
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
              </Draggable> */}

              {dropRowProvided.placeholder}
            </div>
          )}
        </Droppable>
        {/* <Droppable droppableId="new-row" type="new-row" direction="vertical">
          {(dropNewRowProvided) => (
            <div
              className="new-row-drop-zone"
              ref={dropNewRowProvided.innerRef}
              {...dropNewRowProvided.droppableProps}
              // style={{ border: "1px dashed orange", minHeight: "8em" }}
            ></div>
          )}
        </Droppable> */}
      </DragDropContext>
      {/* <Snackbar
        open={snackbarMessage !== ""} //useMemo here
        autoHideDuration={3000}
        // onClose={handleClose}
        message={snackbarMessage}
        // action={action}
      /> */}
    </>
  );
};
