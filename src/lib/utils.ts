/**
 * Transpose a 2 dimensional array. https://en.wikipedia.org/wiki/Transpose
 * @param input 2 dimensional array
 * @return transposed array
 */
export function transpose<T>(input: Array<Array<T>>): Array<Array<T>> {
  return Array.from(Array(input[0].length).keys()).map((it: number) => input.map((line: Array<T>) => line[it]));
}
