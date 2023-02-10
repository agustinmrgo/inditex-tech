import React from "react";
import { describe, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { RowHeader } from "./RowHeader";

const row = { id: "1", alignment: 0, productIds: [] };
const onDeleteRow = vi.fn();
const onRowAligmentChange = vi.fn();

describe("RowHeader", () => {
  test("renders row id", () => {
    const { getByText } = render(
      <RowHeader
        row={row}
        onDeleteRow={onDeleteRow}
        onRowAligmentChange={onRowAligmentChange}
      />
    );
    expect(getByText(row.id)).toBeInTheDocument();
  });

  test("alignment change icon works correctly", () => {
    const { getByTestId } = render(
      <RowHeader
        row={row}
        onDeleteRow={onDeleteRow}
        onRowAligmentChange={onRowAligmentChange}
      />
    );
    const alignmentButton = getByTestId("alignment-button");
    fireEvent.click(alignmentButton);
    expect(onRowAligmentChange).toHaveBeenCalledWith(row.id, 1);
  });

  test("delete button works correctly", () => {
    const { getByTestId } = render(
      <RowHeader
        row={row}
        onDeleteRow={onDeleteRow}
        onRowAligmentChange={onRowAligmentChange}
      />
    );
    const deleteButton = getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(onDeleteRow).toHaveBeenCalled();
  });
});
