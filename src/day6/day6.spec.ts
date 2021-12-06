import fs from 'fs';

import test from 'ava';

import { growthRateCalculator, growthRateCalculatorRemodelled } from './day6';

test('growthRateCalculator', (t) => {
  const fileName = './src/day6/input.txt';

  const testData = [3, 4, 3, 1, 2];

  const testResult = growthRateCalculator(testData, 18);

  t.is(testResult, 26);

  const testResult2 = growthRateCalculator(testData, 80);

  t.is(testResult2, 5934);

  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataRaw: Array<string> = rawData.replace('\r\n', '').split(',');
  const data: Array<number> = dataRaw.map(it => parseInt(it));

  const result = growthRateCalculator(data, 80);

  t.is(result, 350917);

  const resultHuge = growthRateCalculator(data, 256);

  t.is(resultHuge, 350917);

});

test('growthRateCalculatorRemodelled', (t) => {
  const fileName = './src/day6/input.txt';

  const testData = [3, 4, 3, 1, 2];

  const testResult = growthRateCalculatorRemodelled(testData, 18);

  t.is(testResult, 26);

  const testResult2 = growthRateCalculatorRemodelled(testData, 80);

  t.is(testResult2, 5934);

  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataRaw: Array<string> = rawData.replace('\r\n', '').split(',');
  const data: Array<number> = dataRaw.map(it => parseInt(it));

  const result = growthRateCalculatorRemodelled(data, 80);

  t.is(result, 350917);

  const resultHuge = growthRateCalculatorRemodelled(data, 256);

  t.is(resultHuge, 1592918715629);

});
