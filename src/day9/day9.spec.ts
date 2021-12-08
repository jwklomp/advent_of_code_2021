import fs from 'fs';

import test from 'ava';

import { SegmentInfoLine } from './SegmentInto';
import {
  lineToSegmentInfoLine,
  sevenSegmentSearchPartOne, sevenSegmentSearchPartTwo
} from './day9';

test('sevenSegmentSearchPartOne', (t) => {
  const fileNameTest = './src/day8/inputTest.txt';
  const rawDataTest = fs.readFileSync(fileNameTest, 'utf8');

  const dataRawTest: Array<string> = rawDataTest.split('\r\n');
  const dataTest: Array<SegmentInfoLine> = dataRawTest.filter(it => it.length > 0).map(it => lineToSegmentInfoLine(it));

  const testResult = sevenSegmentSearchPartOne(dataTest);

  t.is(testResult, 26);

  const fileName = './src/day8/input.txt';
  const rawData = fs.readFileSync(fileName, 'utf8');

  const dataRaw: Array<string> = rawData.split('\r\n');
  const data: Array<SegmentInfoLine> = dataRaw.filter(it => it.length > 0).map(it => lineToSegmentInfoLine(it));

  const result = sevenSegmentSearchPartOne(data);

  t.is(result, 365);
});

