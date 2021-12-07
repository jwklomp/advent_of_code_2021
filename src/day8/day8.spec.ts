import fs from 'fs';

import test from 'ava';

import {
  crabSubmarineFuelCalculatorLinearConsumption
} from './day8';

test('crabSubmarineFuelCalculator', (t) => {
  const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  const testResult = crabSubmarineFuelCalculatorLinearConsumption(testData);

  t.is(testResult, 37);

  const fileName = './src/day7/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataRaw: Array<string> = rawData.replace('\r\n', '').split(',');
  const data: Array<number> = dataRaw.map(it => parseInt(it));

  const result = crabSubmarineFuelCalculatorLinearConsumption(data);

  t.is(result, 348664);
});
