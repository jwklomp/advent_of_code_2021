import { DijkstraShortestPathAlgorithm, NodeVertex, Vertex } from '../lib/DijkstraShortestPathAlgorithm';
import { Grid2D } from '../lib/Grid2D';

// with special thanks to https://en.wikipedia.org/wiki/Edsger_W._Dijkstra
export const totalRiskCalculator = (input: Array<Array<number>>): number => {
  const grid = new Grid2D(input);

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

  // run the algoritm
  const finish = `${grid.getColumnLength() - 1}.${grid.getRowLength() - 1}`
  return dijkstra.findShortestPath('0.0', finish);
};
