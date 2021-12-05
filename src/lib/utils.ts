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
