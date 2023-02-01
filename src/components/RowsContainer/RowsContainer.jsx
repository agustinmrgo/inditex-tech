import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { ProductsContainer } from "../ProductsContainer/ProductsContainer";

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
                <ProductsContainer
                  key={row.id}
                  row={row}
                  index={index}
                  products={products}
                  onDeleteRow={() => handleDeleteRow(row.id)}
                />
              ))}
              {dropRowProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
