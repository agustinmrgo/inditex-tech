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
      delayForDemo(getLocalStoragePromise("products"), 1000).then((response) =>
        setProducts(response)
      )
    );
    trackPromise(
      delayForDemo(getLocalStoragePromise("rows"), 1540).then((response) =>
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
        alignment: 0,
        productIds: [newProduct.id],
      },
    ]);
  };

  const handleDeleteRow = (rowId) => {
    const newRows = rows.filter((row) => row.id !== rowId);
    setRows(newRows);
  };

  const handleSave = () => {
    if (rows.length > 0) {
      localStorage.setItem("rows", JSON.stringify(rows));
      localStorage.setItem("products", JSON.stringify(products));
      alert("Changes saved successfully!");
    } else {
      alert("There are no rows to save!");
    }
  };

  const handleAligmentChange = (rowId, alignment) => {
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, alignment };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleZoomIn = () => {
    // let root = document.documentElement;
    // const currentFontSize = getComputedStyle(
    //   document.documentElement
    // ).getPropertyValue("--font-size");
    // root.style.setProperty(
    //   "--font-size",
    //   parseInt(currentFontSize) + 10 + "px"
    // );
    // root.style.setProperty("--font-size", 30 + "px");
    // localStorage.setItem("fontSize", 30 + "px");
  };
  const handleZoomOut = () => {
    // let root = document.documentElement;
    // const currentFontSize = getComputedStyle(
    //   document.documentElement
    // ).getPropertyValue("--font-size");
    // root.style.setProperty(
    //   "--font-size",
    //   parseInt(currentFontSize) + 10 + "px"
    // );
    // root.style.setProperty("--font-size", 30 + "px");
    // localStorage.setItem("fontSize", 30 + "px");
  };

  if (promiseInProgress) return <div>Loading rows & products...</div>;

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <button onClick={() => setRows([])}>Clear all</button>
          <button onClick={handleAddRow}>+ Add row</button>
          <button onClick={handleSave}>Save</button>
        </div>
        <div className="top-bar-right">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
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
                    index={index}
                    row={row}
                    products={products}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onRowAligmentChange={handleAligmentChange}
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
