import fs from 'fs';

import test from 'ava';

import { syntaxCheckerCorrupted, syntaxCheckerIncomplete } from './day12';

test('syntaxCheckerCorrupted', (t) => {

  const fileNameTest = './src/day10/inputTest.txt';
  const rawDataTest = fs.readFileSync(fileNameTest, 'utf8');

  const dataRawTest: Array<string> = rawDataTest.split('\r\n').filter(it => it.length > 0);

  const testResult = syntaxCheckerCorrupted(dataRawTest);

  t.is(testResult, 26397);

});
