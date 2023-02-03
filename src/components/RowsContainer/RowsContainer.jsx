import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { ProductsContainer } from "../ProductsContainer/ProductsContainer";
import { getLocalStoragePromise, delayForDemo } from "../../utils/helpers";

import { reorder, reorderRows } from "../../utils/reorder";
import "./RowsContainer.css";

export const RowsContainer = () => {
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const { promiseInProgress } = usePromiseTracker({ delay: 1200 });

  useEffect(() => {
    trackPromise(
      delayForDemo(getLocalStoragePromise("products"), 900).then((response) =>
        setProducts(response)
      )
    );
    trackPromise(
      delayForDemo(getLocalStoragePromise("rows"), 1240).then((response) =>
        setRows(response)
      )
    );
  }, []);

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

  const handleSave = () => {
    localStorage.setItem("rows", JSON.stringify(rows));
    localStorage.setItem("products", JSON.stringify(products));
  };

  // if (products.length === 0 && !promiseInProgress)
  //   return <div>No products!</div>;

  if (promiseInProgress) return <div>Loading rows & products...</div>;

  return (
    <>
      <div style={{ marginBottom: "2em" }}>
        <button onClick={handleAddRow}>+ Add row</button>
        <button onClick={handleSave} style={{ marginLeft: "1em" }}>
          Save
        </button>
      </div>
      {rows.length === 0 && !promiseInProgress && <div>No rows, add one!</div>}
      {rows.length === 0 && promiseInProgress && <div>Loading rows...</div>}
      {!promiseInProgress && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="products-board"
            type="row"
            direction="vertical"
          >
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
      )}
    </>
  );
};
