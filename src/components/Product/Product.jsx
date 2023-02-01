import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import "./Product.css";

export const Product = ({ product, index }) => (
  <Draggable key={product.id} draggableId={product.id} index={index}>
    {(dragProductProvided) => (
      <div
        className="product"
        ref={dragProductProvided.innerRef}
        {...dragProductProvided.draggableProps}
        {...dragProductProvided.dragHandleProps}
      >
        <p>{product.content}</p>
      </div>
    )}
  </Draggable>
);

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  // onDeleteProduct: PropTypes.func.isRequired,
};
