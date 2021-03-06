import { Grid2D } from '../lib/Grid2D';
import { range } from '../lib/utils';

const foldOnY = (grid: Grid2D<number>, fold: number) => {
  const cellsBelowFold = grid.getCellsFiltered(cell => cell.y > fold && cell.value > 0);
  cellsBelowFold.forEach(inputCell => {
    const yNew = ((2 * fold)) - inputCell.y;
    const targetCell = grid.getCellByCoordinate(inputCell.x, yNew);
    targetCell.value = targetCell.value + 1;
    inputCell.value = 0;
  });
};

const foldOnX = (grid: Grid2D<number>, fold: number) => {
  const cellsRightOfFold = grid.getCellsFiltered(cell => cell.x > fold && cell.value > 0);
  cellsRightOfFold.forEach(inputCell => {
    const xNew = ((2 * fold)) - inputCell.x;
    const targetCell = grid.getCellByCoordinate(xNew, inputCell.y);
    targetCell.value = targetCell.value + 1;
    inputCell.value = 0;
  });
};

export const origamiDotCounter = (dots: Array<Array<number>>): number => {
  const folds: Array<Array<'x' | 'y' | number>> =
    [['x', 655], ['y', 447], ['x', 327], ['y', 223], ['x', 163], ['y', 111], ['x', 81],
      ['y', 55], ['x', 40], ['y', 27], ['y', 13], ['y', 6]];

  // determine max x (cols) and y (rows)
  const xMax = Math.max(...dots.map(d => d[0])); // cols = inner
  const yMax = Math.max(...dots.map(d => d[1])); // rows = outer

  // create nested array with these dimensions. The outer array will become rows (y), the inner cols (x).
  const nestedArray: Array<Array<number>> = range(0, yMax).map(_ => range(0, xMax));

  // create grid from array
  const grid = new Grid2D<number>(nestedArray);

  // set all values to zero initially
  grid.getCells().forEach(cell => cell.value = 0);

  // map the dots on the grid, by setting value to 1
  dots.forEach(dot => grid.getCellByCoordinate(dot[0], dot[1]).value = 1);

  // process the folds
  folds.forEach(fold =>
    fold[0] === 'x' ? foldOnX(grid, fold[1] as number) : foldOnY(grid, fold[1] as number));

  // log the result
  range(0, 6).forEach(it =>
    console.log(grid.getCellsFiltered(cell => cell.y === it && cell.x <= 40)
      .map(cell => cell.value > 0 ? '#' : ' ').join('')
    ));

  return grid.getCellsFiltered(cell => cell.value > 0).length;
};
