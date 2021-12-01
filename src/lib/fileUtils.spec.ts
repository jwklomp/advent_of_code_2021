import fs from 'fs';

import test from 'ava';

import { writeUrlDataToFile } from './fileUtils';

test('writeUrlDataToFile', (t) => {
  writeUrlDataToFile('https://www.w3.org/TR/PNG/iso_8859-1.txt', "./src/day1/input.txt");

  fs.readFile("./src/day1/input.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data.split('\n'));
  });

  const d = null
  t.is(d, null);
});

// .split('\n').map(Number);
