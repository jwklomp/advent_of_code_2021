import fs from 'fs';

import test from 'ava';

import { writeUrlDataToFile } from '../lib/fileUtils';


test('writeUrlDataToFile', (t) => {
  const url = '';
  const fileName = './src/day2/input.txt';
  writeUrlDataToFile(url, fileName);

  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    // do something with data
  });

  const d = null;
  t.is(d, null);
});

// .split('\n').map(Number);
