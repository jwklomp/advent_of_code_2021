import fs from 'fs';

import test from 'ava';

import { Grid2D } from '../lib/Grid2D';
import { range } from '../lib/utils';

import { setGridValues, totalRiskCalculator } from './day15';

test('testGridValues', (t) => {
  const fileName = './src/day15/input.txt';
  const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  const numberArray: Array<Array<number>> = rawData.map(it => it.split('').map(it => parseInt(it)));
  const gridOriginal = new Grid2D(numberArray);

  // create a grid of 500 x 500
  const array500x500 = range(0, 499).map(_ => {
    return range(0, 499).map(_ => {
      return 0;
    });
  });

  const grid = new Grid2D(array500x500);
  setGridValues(grid, gridOriginal);

  const cell0_0 = grid.getCellByCoordinate(0, 0);
  t.is(cell0_0.value, 9);

  const cell100_0 = grid.getCellByCoordinate(100, 0);
  t.is(cell100_0.value, 1);
  const cell0_100 = grid.getCellByCoordinate(0, 100);
  t.is(cell0_100.value, 1);
  const cell100_100 = grid.getCellByCoordinate(100, 100);
  t.is(cell100_100.value, 2);

  const cell200_0 = grid.getCellByCoordinate(200, 0);
  t.is(cell200_0.value, 2);
  const cell0_200 = grid.getCellByCoordinate(0, 200);
  t.is(cell0_200.value, 2);
  const cell200_200 = grid.getCellByCoordinate(200, 200);
  t.is(cell200_200.value, 4);

  const cell300_0 = grid.getCellByCoordinate(300, 0);
  t.is(cell300_0.value, 3);
  const cell0_300 = grid.getCellByCoordinate(0, 300);
  t.is(cell0_300.value, 3);
  const cell300_300 = grid.getCellByCoordinate(300, 300);
  t.is(cell300_300.value, 6);

  const cell400_0 = grid.getCellByCoordinate(400, 0);
  t.is(cell400_0.value, 4);
  const cell0_400 = grid.getCellByCoordinate(0, 400);
  t.is(cell0_400.value, 4);
  const cell400_400 = grid.getCellByCoordinate(400, 400);
  t.is(cell400_400.value, 8);

  const cell0_5 = grid.getCellByCoordinate(0, 5);
  t.is(cell0_5.value, 9);

  const cell100_5 = grid.getCellByCoordinate(100, 5);
  t.is(cell100_5.value, 1);
  const cell0_105 = grid.getCellByCoordinate(0, 105);
  t.is(cell0_105.value, 1);
  const cell100_105 = grid.getCellByCoordinate(100, 105);
  t.is(cell100_105.value, 2);

  const cell200_5 = grid.getCellByCoordinate(200, 5);
  t.is(cell200_5.value, 2);
  const cell0_205 = grid.getCellByCoordinate(0, 205);
  t.is(cell0_205.value, 2);
  const cell200_205 = grid.getCellByCoordinate(200, 205);
  t.is(cell200_205.value, 4);

  const cell300_5 = grid.getCellByCoordinate(300, 5);
  t.is(cell300_5.value, 3);
  const cell0_305 = grid.getCellByCoordinate(0, 305);
  t.is(cell0_305.value, 3);
  const cell300_305 = grid.getCellByCoordinate(300, 305);
  t.is(cell300_305.value, 6);

  const cell400_5 = grid.getCellByCoordinate(400, 5);
  t.is(cell400_5.value, 4);
  const cell0_405 = grid.getCellByCoordinate(0, 405);
  t.is(cell0_405.value, 4);
  const cell400_405 = grid.getCellByCoordinate(400, 405);
  t.is(cell400_405.value, 8);


});


test('totalRiskCalculator', (t) => {

  // const fileNameTest = './src/day15/inputTest.txt';
  // const rawDataTest: Array<string> = fs.readFileSync(fileNameTest, 'utf8').split('\r\n').filter(it => it.length > 0);
  // const numberArrayTest: Array<Array<number>> = rawDataTest.map(it => it.split('').map(it => parseInt(it)));
  // const resultTest = totalRiskCalculator(numberArrayTest);
  // t.is(resultTest, 40);

  const fileName = './src/day15/input.txt';
  const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  const numberArray: Array<Array<number>> = rawData.map(it => it.split('').map(it => parseInt(it)));
  const result = totalRiskCalculator(numberArray);
  console.log('Final result: ', result);
  t.is(result, 2998);
});
