import fs from 'fs';

import test from 'ava';

import {
  hydrothermalVentsCalculator,
  rawLineToLine
} from './day5';

test('hydrothermalVentsCalculator', (t) => {
  const fileName = './src/day5/lines.txt';

  const rawTestLines = ['0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2'];

  const testLines = rawTestLines.map((rawLine: string) => rawLineToLine(rawLine));

  const testResult = hydrothermalVentsCalculator(testLines);

  t.is(testResult, 5);

  const rawData = fs.readFileSync(fileName, 'utf8');

  // split into lines
  const rawArray: Array<string> = rawData.split('\r\n');

  const lines = rawArray
    .filter(it => it.length > 0)
    .map((rawLine: string) => rawLineToLine(rawLine));

  const result = hydrothermalVentsCalculator(lines);
  t.is(result, 4421);

});

