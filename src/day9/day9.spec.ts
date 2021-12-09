import fs from 'fs';

import test from 'ava';

import { Point } from './Point';
import { lowPointsCalculator } from './day9';

test('lowPointsCalculator', (t) => {
  const rawDataTest: Array<string> = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678',
  ];

  const dataTest: Array<Array<Point>> = rawDataTest.map((it: string) =>
    it.split('').map((it) => {
      return { height: parseInt(it), lowestRow: false, lowestCol: false };
    })
  );

  const testResult = lowPointsCalculator(dataTest);

  t.is(testResult, 15);

  const fileName = './src/day9/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataRaw: Array<string> = rawData
    .split('\r\n')
    .filter((it) => it.length > 0);

  const data: Array<Array<Point>> = dataRaw.map((it: string) =>
    it.split('').map((it) => {
      return { height: parseInt(it), lowestRow: false, lowestCol: false };
    })
  );

  const result = lowPointsCalculator(data);

  t.is(result, 535);
});
