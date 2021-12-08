import { stringContainsTokenized } from '../lib/utils';

import { SegmentInfoLine } from './SegmentInto';

export const sevenSegmentSearchPartOne = (
  segmentInfoArray: Array<SegmentInfoLine>
): number => {
  // 10 signal patterns (decodeInfo) + 4 digit output value (to convert)

  // 4 digits of 7 segments a-g
  const nrOfSegmentsOne = 2;
  const nrOfSegmentsFour = 4;
  const nrOfSegmentsSeven = 3;
  const nrOfSegmentsEight = 7;

  const searchSegments: Array<number> = [
    nrOfSegmentsOne,
    nrOfSegmentsFour,
    nrOfSegmentsSeven,
    nrOfSegmentsEight,
  ];

  const matchesPerLine: Array<number> = segmentInfoArray.map(
    (segmentInfoLine: SegmentInfoLine) =>
      segmentInfoLine.outputValue.filter((item: string) =>
        searchSegments.includes(item.length)
      ).length
  );

  return matchesPerLine.reduce((partial, a) => partial + a, 0);
};

const processLine = (line: SegmentInfoLine): number => {
  const { signalPatterns, outputValue } = line;

  // sort all the values because in the actual data the chars in the strings are shuffled.
  const signalPatternsSorted: Array<string> = signalPatterns.map((it) =>
    it.split('').sort().join('')
  );
  const outputValueSorted: Array<string> = outputValue.map((it) =>
    it.split('').sort().join('')
  );

  /**
   * Segments as Caps
   *    --A--
   *   B|  -|C
   *    --D--
   *   E| - |F
   *    --G--
   */
  // process ONE.                                                                               C+F known
  const patternOne: string = signalPatternsSorted.filter(
    (it) => it.length === 2
  )[0]; // 2 char string
  const segC_F: Array<string> = patternOne.split('');

  // process SEVEN                                                                             A certain, C+F known
  const patternSeven: string = signalPatternsSorted.filter(
    (it) => it.length === 3
  )[0]; // 3 char string
  const A: string = patternSeven
    .split('')
    .filter((it) => !segC_F.includes(it))[0];

  // process FOUR, B+D known                                                                    A certain, B+D known, C+F known
  const patternFour: string = signalPatternsSorted.filter(
    (it) => it.length === 4
  )[0]; // 4 char string
  const segB_D: Array<string> = patternFour
    .split('')
    .filter((it) => !segC_F.includes(it));

  // process NINE
  // filter on element with length 6 and that have CF, BD and A so we can determine
  const patternNine: string = signalPatternsSorted.filter(
    (it) =>
      it.length === 6 && stringContainsTokenized(it, [A, ...segC_F, ...segB_D])
  )[0]; // 6 char string
  // A certain, C+F known. B+D known, so can determine G                                       A G certain, C+F known. B+D known
  const G: string = patternNine
    .split('') // array with single characters
    .filter((it) => !A.includes(it))
    .filter((it) => !segC_F.includes(it))
    .filter((it) => !segB_D.includes(it))[0];

  // process EIGHT = Nine + E
  // so element in NINE not in Three = B element in three not in five = C
  const patternEight: string = signalPatternsSorted.filter(
    (it) => it.length === 7
  )[0];

  const E: string = patternEight                                                               // A E G certain, C+F known. B+D known
    .split('')
    .filter((it) => !patternNine.split('').includes(it))[0];

  // the element in 9 that is not in 6 must be C
  // process SIX length 6 has both CF, BD and A so we can determine
  // filter on element with length 6 that is not pattern 9 and has segments B and D (this filters out 0)
  const patternSix: string = signalPatternsSorted.filter(
    (it) =>
      it.length === 6 && it !== patternNine && stringContainsTokenized(it, segB_D)
  )[0]; // 6 char string

  const C: string = patternNine                                                               // A C E G certain, C+F known. B+D known
    .split('')
    .filter((it) => !patternSix.includes(it))[0];

  const F: string = segC_F.filter((it) => it !== C)[0];                               // A C E F G certain, B+D known

  // ZERO has B but not D
  const patternZero: string = signalPatternsSorted.filter(
    (it) =>
      it.length === 6 && it !== patternNine && it !== patternSix
  )[0]; // 6 char string

  const B: string = segB_D.filter((it) => patternZero.includes(it))[0];

  const D: string = segB_D.filter((it) => !patternZero.includes(it))[0];

  // Create the digits based on the determined constants and sort them
  const ZERO: string = [A, B, C, E, F, G].sort().join('');
  const ONE: string = [C, F].sort().join('');
  const TWO: string = [A, C, D, E, G].sort().join('');
  const THREE: string = [A, C, D, F, G].sort().join('');
  const FOUR: string = [B, C, D, F].sort().join('');
  const FIVE: string = [A, B, D, F, G].sort().join('');
  const SIX: string = [A, B, D, E, F, G].sort().join('');
  const SEVEN: string = [A, C, F].sort().join('');
  const EIGHT: string = [A, B, C, D, E, F, G].sort().join('');
  const NINE: string = [A, B, C, D, F, G].sort().join('');

  // outputValueSorted is array of 4 strings that each represent a number
  const mappedOutputDigitStringsArray: Array<number> = outputValueSorted.map(
    (value: string) => {
      // value represents a number
      if (value === ZERO) {
        return 0;
      } else if (value === ONE) {
        return 1;
      } else if (value === TWO) {
        return 2;
      } else if (value === THREE) {
        return 3;
      } else if (value === FOUR) {
        return 4;
      } else if (value === FIVE) {
        return 5;
      } else if (value === SIX) {
        return 6;
      } else if (value === SEVEN) {
        return 7;
      } else if (value === EIGHT) {
        return 8;
      } else if (value === NINE) {
        return 9;
      } else {
        console.log('error mapping sequence to digit');
        return 0;
      }
    }
  );

  return mappedOutputDigitStringsArray[0] * 1000 +
    mappedOutputDigitStringsArray[1] * 100 +
    mappedOutputDigitStringsArray[2] * 10 +
    mappedOutputDigitStringsArray[3];
};

export const sevenSegmentSearchPartTwo = (
  segmentInfoArray: Array<SegmentInfoLine>
): number => {
  return segmentInfoArray
    .map((it) => processLine(it))
    .reduce((partial, a) => partial + a, 0);
};

export const lineToSegmentInfoLine = (rawLine: string): SegmentInfoLine => {
  const [spRaw, ovRaw] = rawLine.split(' | ');

  return {
    signalPatterns: spRaw.split(' '),
    outputValue: ovRaw.split(' '),
  };
};
