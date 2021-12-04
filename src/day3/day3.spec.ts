import fs from 'fs';

import test from 'ava';

import { diagnosticsCalculatorGammaEpsilon, diagnosticsCalculatorLifeSupport } from './day3';

test('diagnosticsCalculator', (t) => {
  const fileName = './src/day3/callSequence.txt';

  // const input = [
  //   '00100',
  //   '11110',
  //   '10110',
  //   '10111',
  //   '10101',
  //   '01111',
  //   '00111',
  //   '11100',
  //   '10000',
  //   '11001',
  //   '00010',
  //   '01010'];
  //
  // const inputAsStringArray = input.map(it => it.split(""))
  //
  // const result = diagnosticsCalculator(inputAsStringArray)
  // t.is(result, 198);

  const data = fs.readFileSync(fileName, 'utf8');
  const dataArray = data.split('\n')
    .filter(it => it.length > 0)
    .map(it => it.split("").filter(it => it !== '\r'))
  const result = diagnosticsCalculatorGammaEpsilon(dataArray)
  t.is(result, 2743844);

});

test('diagnosticsCalculatorLifeSupport', (t) => {
  const fileName = './src/day3/callSequence.txt';

  // const input = [
  //   '00100',
  //   '11110',
  //   '10110',
  //   '10111',
  //   '10101',
  //   '01111',
  //   '00111',
  //   '11100',
  //   '10000',
  //   '11001',
  //   '00010',
  //   '01010'];
  //
  // const inputAsStringArray = input.map(it => it.split(""))
  //
  // const result = diagnosticsCalculatorLifeSupport(inputAsStringArray)
  // t.is(result, 230);

  const data = fs.readFileSync(fileName, 'utf8');
  const dataArray = data.split('\n')
    .filter(it => it.length > 0)
    .map(it => it.split("").filter(it => it !== '\r'))
  const result = diagnosticsCalculatorLifeSupport(dataArray)
  t.is(result, 6677951);

});
