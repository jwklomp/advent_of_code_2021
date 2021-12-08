
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

export const lineToSegmentInfoLine = (rawLine: string): SegmentInfoLine => {
  const [spRaw, ovRaw] = rawLine.split(' | ');

  return {
    signalPatterns: spRaw.split(' '),
    outputValue: ovRaw.split(' '),
  };
};
