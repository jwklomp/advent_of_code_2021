import fs from 'fs';

import test from 'ava';

import { passagePathCalculator } from './day12';

test('syntaxCheckerCorrupted', (t) => {

  // const fileNameTest = './src/day12/inputTest.txt';
  // const rawDataTest = fs.readFileSync(fileNameTest, 'utf8');
  //
  // const dataAsStringsTest: Array<string> = rawDataTest.split('\r\n').filter(it => it.length > 0);
  //
  // const testResult = passagePathCalculator(dataAsStringsTest);
  //
  // t.is(testResult, 3509);


  const fileName = './src/day12/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataAsStrings: Array<string> = rawData.split('\r\n').filter(it => it.length > 0);

  const result = passagePathCalculator(dataAsStrings);

  t.is(result, 84271);


});
