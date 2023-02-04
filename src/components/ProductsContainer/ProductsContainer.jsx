import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { RowHeader } from "../RowHeader/RowHeader";
import { Product } from "../Product/Product";
import { aligments } from "../../utils/constants";
import "./ProductsContainer.css";

export const ProductsContainer = ({
  index,
  row,
  products,
  onDeleteRow,
  onRowAligmentChange,
}) => (
  <Draggable key={row.id} draggableId={row.id} index={index}>
    {(dragRowProvided) => (
      <div
        className="row-container"
        ref={dragRowProvided.innerRef}
        {...dragRowProvided.draggableProps}
        {...dragRowProvided.dragHandleProps}
      >
        <RowHeader
          row={row}
          onDeleteRow={onDeleteRow}
          onRowAligmentChange={onRowAligmentChange}
        />
        <Droppable droppableId={row.id} type="product" direction="horizontal">
          {(dropProductsProvided) => (
            <div
              className={`products-list products-align-${
                aligments[row.alignment]
              }`}
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
                  <Product key={product.id} product={product} index={index} />
                );
              })}
              {dropProductsProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )}
  </Draggable>
);

ProductsContainer.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    alignment: PropTypes.number.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  products: PropTypes.array,
  onDeleteRow: PropTypes.func.isRequired,
  onRowAligmentChange: PropTypes.func.isRequired,
};
