import React from "react";
import PropTypes from "prop-types";

import "./RowHeader.css";

export const RowHeader = ({ row, onDeleteRow }) => (
  <div className="row-header-container">
    <h2>{row.id}</h2>
    <button className="edit-button">✏️</button>
    <button className="edit-button" onClick={onDeleteRow}>
      🗑️
    </button>
  </div>
);

RowHeader.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onDeleteRow: PropTypes.func.isRequired,
};
