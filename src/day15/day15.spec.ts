import fs from 'fs';

import test from 'ava';

import { polymerCreator } from './day15';

test('polymerCreator', (t) => {

  const fileNameTest = './src/day15/inputTest.txt';
  const rawDataTest: Array<string> = fs.readFileSync(fileNameTest, 'utf8').split('\r\n').filter(it => it.length > 0);
  const stringArray: Array<[string, string]> = rawDataTest.map(it => it.split(' -> '));
  const resultTest = polymerCreator(stringArray);
  t.is(resultTest, 2189668501237);

  // const fileName = './src/day14/input.txt';
  // const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  // const stringArray: Array<[string, string]> = rawData.map(it => it.split(' -> '));
  // const result = polymerCreator(stringArray);
  // t.is(result, 3018019237563);
});
