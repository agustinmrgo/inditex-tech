// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderRows = (rows, source, destination) => {
  const reorderedRows = Array.from(rows);
  const sourceRow = reorderedRows.find((row) => row.id === source.droppableId);
  // reorder products within a row
  if (source.droppableId === destination.droppableId) {
    const reorderedProductIds = reorder(
      sourceRow.productIds,
      source.index,
      destination.index
    );
    sourceRow.productIds = [...reorderedProductIds];
  }

  // move product from one row to another
  if (source.droppableId !== destination.droppableId) {
    const destinationRow = reorderedRows.find(
      (row) => row.id === destination.droppableId
    );
    // avoid empty rows and rows with more than 3 products
    if (
      sourceRow.productIds.length > 1 &&
      destinationRow.productIds.length < 3
    ) {
      const item = sourceRow.productIds.splice(source.index, 1)[0];
      destinationRow.productIds.splice(destination.index, 0, item);
    }
  }

  return [...reorderedRows];
};
