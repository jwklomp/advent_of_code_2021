import test from 'ava';

import { transpose } from './utils';

test('transpose', (t) => {
  const input = [[1, 2, 3],[4, 5, 6]]
  const transposed = transpose<number>(input)
  t.is(transposed.length, 3);

  t.is(transposed[0].length, 2);
  t.is(transposed[0][0], 1);
  t.is(transposed[0][1], 4);

  t.is(transposed[1].length, 2);
  t.is(transposed[1][0], 2);
  t.is(transposed[1][1], 5);

  t.is(transposed[2].length, 2);
  t.is(transposed[2][0], 3);
  t.is(transposed[2][1], 6);
});

