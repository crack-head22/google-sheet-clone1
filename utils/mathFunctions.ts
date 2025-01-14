export const mathFunctions = {
  SUM: (values: number[]) => values.reduce((acc, val) => acc + val, 0),
  AVERAGE: (values: number[]) => values.reduce((acc, val) => acc + val, 0) / values.length,
  MAX: (values: number[]) => Math.max(...values),
  MIN: (values: number[]) => Math.min(...values),
  COUNT: (values: number[]) => values.filter(val => typeof val === 'number').length,
  TRIM: (value: string) => value.trim(),
  UPPER: (value: string) => value.toUpperCase(),
  LOWER: (value: string) => value.toLowerCase(),
  REMOVE_DUPLICATES: (values: any[]) => [...new Set(values)],
  FIND_AND_REPLACE: (value: string, find: string, replace: string) => value.replace(new RegExp(find, 'g'), replace),
};

export const evaluateFormula = (
  formula: string,
  getCellValue: (cellId: string) => number | string,
  cellId: string,
  evaluatedCells: Set<string> = new Set()
): number | string => {
  if (evaluatedCells.has(cellId)) {
    return '#CIRCULAR!';
  }
  evaluatedCells.add(cellId);

  // Fix regex to match formulas like "=SUM(A1:B2)"
  const functionMatch = formula.match(/^=(\w+)\((.*)\)$/);
  if (!functionMatch) return formula; // Not a formula, return raw input

  const [, functionName, args] = functionMatch; // Extract function name and arguments
  const func = mathFunctions[functionName as keyof typeof mathFunctions];
  if (!func) return '#NAME?'; // Invalid function name

  // Parse cell ranges and collect values
  const cellRanges = args.split(',').map(range => range.trim());
  const values = cellRanges.flatMap(range => {
    const [start, end] = range.split(':');
    if (!end) {
      // Single cell
      const value = getCellValue(start);
      return typeof value === 'number' ? [value] : [];
    }

    // Range (e.g., A1:B2)
    const [startCol, startRow] = start.match(/([A-Z]+)(\d+)/)?.slice(1) || [];
    const [endCol, endRow] = end.match(/([A-Z]+)(\d+)/)?.slice(1) || [];

    const rangeValues = [];
    for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
      for (let row = parseInt(startRow); row <= parseInt(endRow); row++) {
        const currentCellId = `${String.fromCharCode(col)}${row}`;
        const value = getCellValue(currentCellId);
        if (typeof value === 'number') rangeValues.push(value);
      }
    }
    return rangeValues;
  });

  try {
    return func(values); // Pass the array to the math function
  } catch (error) {
    return '#ERROR!';
  }
};

export const validateDataType = (value: string): 'number' | 'date' | 'text' => {
  if (!isNaN(Number(value))) return 'number';
  if (!isNaN(Date.parse(value))) return 'date';
  return 'text';
};

