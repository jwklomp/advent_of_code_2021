import fs from 'fs';

import test from 'ava';

import { Grid2D } from '../lib/Grid2D';
// import { range } from '../lib/utils';

import { octopusFlashCounter } from './day11';

test('octopusFlashCounter', (t) => {

  // const fileNameTest = './src/day11/inputTestSmall.txt';
  // const rawDataTest: Array<string> = fs.readFileSync(fileNameTest, 'utf8').split('\r\n').filter(it => it.length > 0);
  // const numericArray: Array<Array<number>> = rawDataTest.map(it => it.split('').map(it => parseInt(it)));
  //
  // const grid = new Grid2D<number>(numericArray);
  // const testResult1 = octopusFlashCounter(grid, 1);
  // t.is(testResult1, 9);
  //
  // const grid2 = new Grid2D<number>(numericArray);
  // const testResult2 = octopusFlashCounter(grid2, 2);
  // t.is(testResult2, 9);

  // const fileNameTest2 = './src/day11/inputTest.txt';
  // const rawDataTest2: Array<string> = fs.readFileSync(fileNameTest2, 'utf8').split('\r\n').filter(it => it.length > 0);
  // const numericArray2: Array<Array<number>> = rawDataTest2.map(it => it.split('').map(it => parseInt(it)));

  // step 2 = 35
  // step 3 = 45, total 80
  // step 4 = 16, total 96
  // step 5 = 8, total 104
  // step 6 = 1, total 105
  // step 7 = 7, total 112
  // const grid3 = new Grid2D<number>(numericArray2);
  // const resultTest = octopusFlashCounter(grid3, 200);
  // t.is(resultTest, 1656);

  // const rows = range(0, 9).map(nr => grid3.getCellsFiltered(it => it.y === nr).map(it => it.value).join(''));
  // const expectedRows = ['6707366222',
  //   '4377366333',
  //   '4475555827',
  //   '3496655709',
  //   '3500625609',
  //   '3509955566',
  //   '3486694453',
  //   '8865585555',
  //   '4865580644',
  //   '4465574644'];
  //t.deepEqual(rows, expectedRows);


  const fileName = './src/day11/input.txt';
  const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  const final: Array<Array<number>> = rawData.map(it => it.split('').map(it => parseInt(it)));
  const gridFinal = new Grid2D<number>(final);
  const res = octopusFlashCounter(gridFinal, 500);
  t.is(res, 1546);
});
