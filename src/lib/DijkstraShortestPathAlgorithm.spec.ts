import test from 'ava';

import { DijkstraShortestPathAlgorithm, Vertex } from './DijkstraShortestPathAlgorithm';

test('dijkstaShortestPathTest', (t) => {
  const dijkstraShortestPath = new DijkstraShortestPathAlgorithm();

  dijkstraShortestPath.addVertex(new Vertex('1.1', [{ nameOfVertex: '1.3', weight: 3 }, {
    nameOfVertex: '1.5',
    weight: 7
  }, { nameOfVertex: '1.2', weight: 4 }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.2', [{ nameOfVertex: '1.1', weight: 4 }, {
    nameOfVertex: '1.3',
    weight: 6
  }, { nameOfVertex: '1.4', weight: 5 }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.3', [{ nameOfVertex: '1.1', weight: 3 }, {
    nameOfVertex: '1.2',
    weight: 6
  }, { nameOfVertex: '1.5', weight: 8 }, { nameOfVertex: '1.4', weight: 11 }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.4', [{ nameOfVertex: '1.2', weight: 5 }, {
    nameOfVertex: '1.3',
    weight: 11
  }, { nameOfVertex: '1.5', weight: 2 }, { nameOfVertex: '1.6', weight: 2 }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.5', [{ nameOfVertex: '1.1', weight: 7 }, {
    nameOfVertex: '1.3',
    weight: 8
  }, { nameOfVertex: '1.4', weight: 2 }, { nameOfVertex: '1.7', weight: 5 }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.6', [{ nameOfVertex: '1.4', weight: 2 }, {
    nameOfVertex: '1.7',
    weight: 3
  }], 1));

  dijkstraShortestPath.addVertex(new Vertex('1.7', [{ nameOfVertex: '1.4', weight: 10 }, {
    nameOfVertex: '1.5',
    weight: 5
  }, { nameOfVertex: '1.6', weight: 3 }], 1));

  const totalWeight  = dijkstraShortestPath.findShortestPath('1.1', '1.6');
  console.log(dijkstraShortestPath.findShortestPath('1.1', '1.6'));
  t.is(totalWeight, 11);
});
