import fs from 'fs';

import test from 'ava';

import { syntaxCheckerCorrupted, syntaxCheckerIncomplete } from './day10';

test('syntaxCheckerCorrupted', (t) => {

  const fileNameTest = './src/day10/inputTest.txt';
  const rawDataTest = fs.readFileSync(fileNameTest, 'utf8');

  const dataRawTest: Array<string> = rawDataTest.split('\r\n').filter(it => it.length > 0);

  const testResult = syntaxCheckerCorrupted(dataRawTest);

  t.is(testResult, 26397);

  const fileName = './src/day10/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');
  const dataRaw: Array<string> = rawData.split('\r\n').filter(it => it.length > 0);

  const result = syntaxCheckerCorrupted(dataRaw);

  t.is(result, 469755);
});

test('syntaxCheckerIncomplete', (t) => {

  const fileNameTest = './src/day10/inputTest.txt';
  const rawDataTest = fs.readFileSync(fileNameTest, 'utf8');

  const dataRawTest: Array<string> = rawDataTest.split('\r\n').filter(it => it.length > 0);

  const testResult = syntaxCheckerIncomplete(dataRawTest);

  t.is(testResult, 288957);

  const fileName = './src/day10/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');
  const dataRaw: Array<string> = rawData.split('\r\n').filter(it => it.length > 0);

  const result = syntaxCheckerIncomplete(dataRaw);

  t.is(result, 2762335572);
});
