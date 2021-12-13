import fs from 'fs';

import test from 'ava';

import { origamiDotCounter } from './day13';

test('origamiDotCounter', (t) => {

  // const fileNameTest = './src/day13/inputTest.txt';
  // const rawDataTest: Array<string> = fs.readFileSync(fileNameTest, 'utf8').split('\r\n').filter(it => it.length > 0);
  // const numericArray: Array<Array<number>> = rawDataTest.map(it => it.split(',').map(it => parseInt(it)));
  // const resultTest = origamiDotCounter(numericArray);
  // t.is(resultTest, 16);

  const fileName = './src/day13/input.txt';
  const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  const numericArray: Array<Array<number>> = rawData.map(it => it.split(',').map(it => parseInt(it)));
  const result = origamiDotCounter(numericArray);
  t.is(result, 755);
});
