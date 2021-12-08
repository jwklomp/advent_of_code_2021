/**
 * Transpose a 2 dimensional array. https://en.wikipedia.org/wiki/Transpose
 * @param input 2 dimensional array
 * @return transposed array
 */
export function transpose<T>(input: Array<Array<T>>): Array<Array<T>> {
  return Array.from(Array(input[0].length).keys()).map((it: number) => input.map((line: Array<T>) => line[it]));
}

/**
 * Create an array containing all numbers between a start and an end.
 * Optionally a step can be specified, if not a default of one is used.
 * If the start is a bigger number than the end, the range will be in reverse order.
 * @param start
 * @param stop
 * @param step
 */
export const range = (start: number, stop: number, step = 1): Array<number> =>
  start <= stop ?
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    : Array.from({ length: (start - stop) / step + 1 }, (_, i) => stop + (i * step)).reverse();

export const average = (arr: Array<number>): number => arr.reduce((a, b) => a + b, 0) / arr.length;

export const getFirstIndexOfMinValue = (arr: Array<number>): number =>
  arr.reduce((r, v, i, a) => v >= a[r] ? r : i, -1);


export const stringContainsTokenized = (stringToCheck: string, checkValues: Array<string>) => {
  const checkTokenized = stringToCheck.split('');
  return checkValues.every(it => checkTokenized.includes(it));
};


export const binarySort = (arr: number[], value: number): number => {
  const indexToCheck = Math.floor((arr.length - 1) / 2);
  const iValue = arr[indexToCheck];

  if (value === iValue) return indexToCheck;
  if (arr.length === 1) return (iValue > value) ? ~0 : ~1; // bitwize not
  if (value < iValue) return binarySort(arr.slice(0, indexToCheck), value);

  const subResult = binarySort(arr.slice(indexToCheck + 1), value);
  return subResult >= 0
    ? indexToCheck + 1 + subResult
    : ~(indexToCheck + 1 + ~subResult);
};
