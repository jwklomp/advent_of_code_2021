export interface Cell<T> {
  x: number;
  y: number;
  value: T;
}

/**
 * Model a 2 dimensional array as a grid including some util functions
 * The outer array will become rows (y), the inner cols (x)
 *          cols (x)
 *      0-------x ------>
 * rows |
 * (y)  y
 *      |
 *      V
 */
export class Grid2D<T> {
  readonly rowLength: number;
  readonly colLength: number;
  readonly grid: Array<Array<Cell<T>>>;

  constructor(data: Array<Array<T>>) {
    // TODO: check if array is well formed
    this.rowLength = data.length;
    this.colLength = data[0].length;
    this.grid = this.arrayToGrid(data);
  }

  arrayToGrid(data: Array<Array<T>>): Array<Array<Cell<T>>> {
    return data.map((row: Array<T>, rowIndex: number) => {
      return row.map((value: T, colIndex: number) => {
        return { x: colIndex, y: rowIndex, value };
      });
    });
  }

  getCells(): Array<Cell<T>> {
    return this.grid.flatMap((row: Array<Cell<T>>) =>
      row.map((cell: Cell<T>) => cell));
  }

  getCellsFiltered(filterFn: (a: Cell<T>) => boolean): Array<Cell<T>> {
    return this.getCells().filter(it => filterFn(it));
  }

  /**
   * Get the adjacent cells of a cell. Can return at most 4 cells and at least 2 when in corner
   *    |  --x-->
   *    |    x
   *    y  x/O/x
   *    |    x
   */
  adjacent<T>(cell: Cell<T>): Array<Cell<T>> {
    const adjacentCells: Array<Cell<T>> = [];

    if (cell.y > 0) {  // will subtract 1 so needs to be > 0
      adjacentCells.push(this.grid[cell.y - 1][cell.x] as unknown as Cell<T>);
    }

    if (cell.y < this.rowLength - 1) {  // will add 1 so needs to be > 0
      adjacentCells.push(this.grid[cell.y + 1][cell.x] as unknown as Cell<T>);
    }

    if (cell.x > 0) {  // will subtract 1 so needs to be > 0
      adjacentCells.push(this.grid[cell.y][cell.x - 1] as unknown as Cell<T>);
    }

    if (cell.x < this.colLength - 1) {  // will add 1 so needs to be > 0
      adjacentCells.push(this.grid[cell.y][cell.x + 1] as unknown as Cell<T>);
    }

    return adjacentCells;
  }

  /**
   * Get all surrounding cells of a cell. Can return at most 8 cells and at least 3 when in corner
   *   --x->
   *  |   x x x
   *  y   x/O/x
   *      x x x
   */
  surrounding<T>(cell: Cell<T>): Array<Cell<T>> {
    // start with adjacent
    const surroundingCells: Array<Cell<T>> = this.adjacent(cell);

    // get top left, so x one smaller, y one smaller
    if (cell.x > 0 && cell.y > 0) {
      surroundingCells.push(this.grid[cell.y - 1][cell.x - 1] as unknown as Cell<T>);
    }

    // get top right, so x one larger, y one smaller
    if (cell.x < this.colLength - 1 && cell.y > 0) {
      surroundingCells.push(this.grid[cell.y - 1][cell.x + 1] as unknown as Cell<T>);
    }

    // get bottom left, so x one smaller, y one larger
    if (cell.x > 0 && cell.y < this.rowLength - 1) {
      surroundingCells.push(this.grid[cell.y + 1][cell.x - 1] as unknown as Cell<T>);
    }

    // get bottom right, so x one larger, y one larger
    if (cell.x < this.colLength - 1 && cell.y < this.rowLength - 1) {
      surroundingCells.push(this.grid[cell.y + 1][cell.x + 1] as unknown as Cell<T>);
    }

    return surroundingCells;
  }

}
