import test from 'ava';

import { Cell, Grid2D } from './Grid2D';

/**
 *  |  --x-->
 *  |  0, 2, 3
 *  y  4, 5, 6
 *  |  7, 8, 9
 */

const inputArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const grid2D = new Grid2D<number>(inputArray);

test('constructor', (t) => {
  const cells = grid2D.getCells();
  t.is(cells.length, 9);
});

test('getCellsFiltered', (t) => {
  const cells = grid2D.getCellsFiltered((cell: Cell<number>) => cell.value > 4);
  t.is(cells.length, 5);
});

test('adjacent', (t) => {
  // middle cell, should return 4 other cells ()
  const adjacentCells11 = grid2D.adjacent({ x: 1, y: 1, value: 1 });
  t.is(adjacentCells11.length, 4);

  const expected11 = [
    {
      'x': 1,
      'y': 0,
      'value': 2
    },
    {
      'x': 1,
      'y': 2,
      'value': 8
    },
    {
      'x': 0,
      'y': 1,
      'value': 4
    },
    {
      'x': 2,
      'y': 1,
      'value': 6
    }
  ];
  t.deepEqual(adjacentCells11, expected11);

  // middle right, has 3 surrounding
  const adjacentCells21 = grid2D.adjacent({ x: 2, y: 1, value: 1 });
  t.is(adjacentCells21.length, 3);
  const expected21 = [
    {
      'x': 0,
      'y': 0,
      'value': 1
    },
    {
      'x': 0,
      'y': 2,
      'value': 7
    },
    {
      'x': 1,
      'y': 1,
      'value': 5
    },
    {
      'x': 1,
      'y': 0,
      'value': 2
    },
    {
      'x': 1,
      'y': 2,
      'value': 8
    }
  ];
  t.deepEqual(adjacentCells21, expected21);

  // TODO more tests

});

test('surrounding top row', (t) => {
  // top left, has 3 surrounding
  const surroundingCells00 = grid2D.surrounding({ x: 0, y: 0, value: 1 });
  t.is(surroundingCells00.length, 3);
  const expected00 = [
    {
      'x': 0,
      'y': 1,
      'value': 4
    },
    {
      'x': 1,
      'y': 0,
      'value': 2
    },
    {
      'x': 1,
      'y': 1,
      'value': 5
    }
  ];
  t.deepEqual(surroundingCells00, expected00);

  // top middle, has 5 surrounding
  const surroundingCells10 = grid2D.surrounding({ x: 1, y: 0, value: 1 });
  t.is(surroundingCells10.length, 5);
  const expected10 = [
    {
      'x': 1,
      'y': 1,
      'value': 5
    },
    {
      'x': 0,
      'y': 0,
      'value': 1
    },
    {
      'x': 2,
      'y': 0,
      'value': 3
    },
    {
      'x': 0,
      'y': 1,
      'value': 4
    },
    {
      'x': 2,
      'y': 1,
      'value': 6
    }
  ];
  t.deepEqual(surroundingCells10, expected10);

  // top right, has 3 surrounding
  const surroundingCells20 = grid2D.surrounding({ x: 2, y: 0, value: 1 });
  t.is(surroundingCells20.length, 3);
  const expected20 = [
    {
      'x': 2,
      'y': 1,
      'value': 6
    },
    {
      'x': 1,
      'y': 0,
      'value': 2
    },
    {
      'x': 1,
      'y': 1,
      'value': 5
    }
  ];
  t.deepEqual(surroundingCells20, expected20);
});

test('surrounding middle row', (t) => {
  // middle left, has 5 surrounding
  const surroundingCells01 = grid2D.surrounding({ x: 0, y: 1, value: 1 });
  t.is(surroundingCells01.length, 5);
  const expected01 = [
    {
      'x': 0,
      'y': 0,
      'value': 1
    },
    {
      'x': 0,
      'y': 2,
      'value': 7
    },
    {
      'x': 1,
      'y': 1,
      'value': 5
    },
    {
      'x': 1,
      'y': 0,
      'value': 2
    },
    {
      'x': 1,
      'y': 2,
      'value': 8
    }
  ];
  t.deepEqual(surroundingCells01, expected01);

  // middle middle cell, should return all 8 other cells
  const surroundingCells11 = grid2D.surrounding({ x: 1, y: 1, value: 1 });
  t.is(surroundingCells11.length, 8);

  // middle right, has 5 surrounding
  const surroundingCells21 = grid2D.surrounding({ x: 2, y: 1, value: 1 });
  t.is(surroundingCells21.length, 5);
  const expected21 = [
    {
      "x": 2,
      "y": 0,
      "value": 3
    },
    {
      "x": 2,
      "y": 2,
      "value": 9
    },
    {
      "x": 1,
      "y": 1,
      "value": 5
    },
    {
      "x": 1,
      "y": 0,
      "value": 2
    },
    {
      "x": 1,
      "y": 2,
      "value": 8
    }
  ];
  t.deepEqual(surroundingCells21, expected21);

});
test('surrounding bottom row', (t) => {
  // bottom left, has 3 surrounding
  const surroundingCells02 = grid2D.surrounding({ x: 0, y: 2, value: 1 });
  t.is(surroundingCells02.length, 3);
  const expected02 = [
    {
      "x": 0,
      "y": 1,
      "value": 4
    },
    {
      "x": 1,
      "y": 2,
      "value": 8
    },
    {
      "x": 1,
      "y": 1,
      "value": 5
    }
  ];
  t.deepEqual(surroundingCells02, expected02);

  // bottom middle cell, should return all 5
  const surroundingCells12 = grid2D.surrounding({ x: 1, y: 2, value: 1 });
  t.is(surroundingCells12.length, 5);
  const expected12 = [
    {
      "x": 1,
      "y": 1,
      "value": 5
    },
    {
      "x": 0,
      "y": 2,
      "value": 7
    },
    {
      "x": 2,
      "y": 2,
      "value": 9
    },
    {
      "x": 0,
      "y": 1,
      "value": 4
    },
    {
      "x": 2,
      "y": 1,
      "value": 6
    }
  ]
  t.deepEqual(surroundingCells12, expected12);

  // bottom right, has 3 surrounding
  const surroundingCells22 = grid2D.surrounding({ x: 2, y: 2, value: 1 });
  t.is(surroundingCells22.length, 3);
  const expected22 = [
    {
      "x": 2,
      "y": 1,
      "value": 6
    },
    {
      "x": 1,
      "y": 2,
      "value": 8
    },
    {
      "x": 1,
      "y": 1,
      "value": 5
    }
  ];
  t.deepEqual(surroundingCells22, expected22);

});

test('updating a value', (t) => {
  // middle cell, should return all 8 other cells ()
  const cells = grid2D.getCellsFiltered((cell: Cell<number>) => cell.value === 4);
  t.is(cells.length, 1);
  const cell = cells[0];
  cell.value = 14;
  const cellsUpdated = grid2D.getCellsFiltered((cell: Cell<number>) => cell.value === 14);
  t.is(cellsUpdated.length, 1);
});
