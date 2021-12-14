import fs from 'fs';

import test from 'ava';

import { polymerCreator } from './day14';

test('polymerCreator', (t) => {

  // const fileNameTest = './src/day14/inputTest.txt';
  // const rawDataTest: Array<string> = fs.readFileSync(fileNameTest, 'utf8').split('\r\n').filter(it => it.length > 0);
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // const stringArray: Array<[string, string]> = rawDataTest.map(it => it.split(' -> '));
  // const resultTest = polymerCreator(stringArray);
  // t.is(resultTest, 1588);

  const fileName = './src/day14/input.txt';
  const rawData: Array<string> = fs.readFileSync(fileName, 'utf8').split('\r\n').filter(it => it.length > 0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const stringArray: Array<[string, string]> = rawData.map(it => it.split(' -> '));
  const result = polymerCreator(stringArray);
  t.is(result, 2447);
});
