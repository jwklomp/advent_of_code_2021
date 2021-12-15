import { DijkstraShortestPathAlgorithm, NodeVertex, Vertex } from '../lib/DijkstraShortestPathAlgorithm';
import { Grid2D } from '../lib/Grid2D';
import { range } from '../lib/utils';

const adjustValue = (value: number): number =>
  value <= 9 ? value : (value % 9 === 0) ? 9 : value % 9;

export const setGridValues = (grid: Grid2D<number>, gridOriginal: Grid2D<number>) => {
  // update the cell values based on the algorithm
  const destinationCells = grid.getCells();
  destinationCells.forEach(destinationCell => {
    // get source cell
    const x = destinationCell.x % 100;
    const y = destinationCell.y % 100;
    const sourceCell = gridOriginal.getCellByCoordinate(x, y);
    const value = sourceCell.value
      + Math.floor(destinationCell.x / 100)
      + Math.floor(destinationCell.y / 100);
    destinationCell.value = adjustValue(value);
  });
}

// with special thanks to https://en.wikipedia.org/wiki/Edsger_W._Dijkstra
export const totalRiskCalculator = (input: Array<Array<number>>): number => {
  const gridOriginal = new Grid2D(input);

  // create a grid of 500 x 500
  const array500x500 = range(0, 499).map(_ => {
    return range(0, 499).map(_ => {
      return 0;
    });
  });

  const grid = new Grid2D(array500x500);
  setGridValues(grid, gridOriginal);

  // create a Dijkstra shortest path calculator
  const dijkstra = new DijkstraShortestPathAlgorithm();

  // get all cells of the grid and for each cell. Per cell (Vertex), get the adjacent cells (nodes)
  // and add to the calculator'.
  const cells = grid.getCells();
  cells.forEach(cell => {
    const nodes: Array<NodeVertex> = grid.adjacent(cell).map(adj => {
      return { nameOfVertex: `${adj.x}.${adj.y}`, weight: adj.value };
    });
    dijkstra.addVertex(new Vertex(`${cell.x}.${cell.y}`, nodes, cell.value));
  });

  // run the algorithm
  const finish = `${grid.getColumnLength() - 1}.${grid.getRowLength() - 1}`;
  return dijkstra.findShortestPath('0.0', finish);
};
