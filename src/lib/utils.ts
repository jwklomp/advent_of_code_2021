/**
 * Transpose a 2 dimensional array. https://en.wikipedia.org/wiki/Transpose
 * @param input 2 dimensional array
 * @return transposed array
 */
export function transpose<T>(input: Array<Array<T>>): Array<Array<T>> {
  return Array.from(Array(input[0].length).keys()).map((it: number) => input.map((line: Array<T>) => line[it]));
}

export const range = (start: number, stop: number, step = 1): Array<number> =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
