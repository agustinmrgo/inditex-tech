import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { RowHeader } from "../RowHeader/RowHeader";
import { Product } from "../Product/Product";

import "./ProductsContainer.css";

export const ProductsContainer = ({ row, index, products, onDeleteRow }) => {
  const { id, productIds } = row;
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(dragRowProvided) => (
        <div
          className="row-container"
          ref={dragRowProvided.innerRef}
          {...dragRowProvided.draggableProps}
          {...dragRowProvided.dragHandleProps}
        >
          {/* <RowHeader row={row} onDeleteRow={onDeleteRow} /> */}
          <Droppable droppableId={row.id} type="product" direction="horizontal">
            {(dropProductsProvided) => (
              <div
                className="products-list"
                ref={dropProductsProvided.innerRef}
                {...dropProductsProvided.draggableProps}
              >
                {productIds.map((productId, index) => {
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
                <RowHeader row={row} onDeleteRow={onDeleteRow} />
                {dropProductsProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

ProductsContainer.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  products: PropTypes.array,
  onDeleteRow: PropTypes.func.isRequired,
};
