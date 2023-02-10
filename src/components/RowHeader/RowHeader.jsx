import React, { useState } from "react";
import PropTypes from "prop-types";

import { aligments } from "../../utils/constants";
import AlignLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AlignCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import AlignRightIcon from "@mui/icons-material/AlignHorizontalRight";

import "./RowHeader.css";

export const RowHeader = ({ row, onDeleteRow, onRowAligmentChange }) => {
  const [alignment, setAlignment] = useState(row.alignment);

  const handleAligmentChange = () => {
    const newAligmentIndex = (alignment + 1) % aligments.length;
    setAlignment(newAligmentIndex);
    onRowAligmentChange(row.id, newAligmentIndex);
  };

  return (
    <div className="row-header-container">
      <h2>{row.id}</h2>
      <div style={{ display: "flex" }}>
        <button
          data-testid="alignment-button"
          className="edit-button"
          style={{ marginRight: "1em" }}
          onClick={handleAligmentChange}
        >
          {alignment === 0 && <AlignLeftIcon style={{ height: "1.2em" }} />}
          {alignment === 1 && <AlignCenterIcon style={{ height: "1.2em" }} />}
          {alignment === 2 && <AlignRightIcon style={{ height: "1.2em" }} />}
        </button>
        <button
          data-testid="delete-button"
          className="edit-button"
          onClick={onDeleteRow}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

RowHeader.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    alignment: PropTypes.number.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onRowAligmentChange: PropTypes.func.isRequired,
};
