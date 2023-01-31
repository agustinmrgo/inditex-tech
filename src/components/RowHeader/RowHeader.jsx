import React from "react";

import "./RowHeader.css";

export const RowHeader = ({ row }) => (
  <div className="row-header-container">
    <h2>{row.id}</h2>
    <button className="edit-button">✏️</button>
  </div>
);
