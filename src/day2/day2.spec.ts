import fs from 'fs';

import test from 'ava';

import { PositionCommand } from './PositionCommand';
import { positionCalculator, positionCalculatorWithAim } from './day2';

test('positionCalculator', (t) => {
  const fileName = './src/day2/callSequence.txt';

  // const input: Array<PositionCommand> = [
  //   { commandType: "forward", amount: 5}
  //   , { commandType: "down", amount: 5}
  //   , { commandType: "forward", amount: 8}
  //   , { commandType: "up", amount: 3}
  //   , { commandType: "down", amount: 8}
  //   , { commandType: "forward", amount: 2}
  // ]

  // const result = positionCalculator(input)
  // t.is(result, 150);

  const data = fs.readFileSync(fileName, 'utf8');
  const dataArray = data.split('\n').map(row => row.split(' '));
  const input: Array<PositionCommand> = dataArray.map(row => {
    const amount = row[1] ? parseInt(row[1].replace('\r', "")) : 0;
    return { commandType: row[0], amount };
  }).filter(it => it.commandType.length > 0);
  const result = positionCalculator(input);
  t.is(result, 1727835);

});

test('positionCalculatorWithAim', (t) => {
  const fileName = './src/day2/callSequence.txt';

  // const input: Array<PositionCommand> = [
  //   { commandType: "forward", amount: 5}
  //   , { commandType: "down", amount: 5}
  //   , { commandType: "forward", amount: 8}
  //   , { commandType: "up", amount: 3}
  //   , { commandType: "down", amount: 8}
  //   , { commandType: "forward", amount: 2}
  // ]
  //
  // const result = positionCalculatorWithAim(input)
  // t.is(result, 900);

  const data = fs.readFileSync(fileName, 'utf8');
  const dataArray = data.split('\n').map(row => row.split(' '));
  const input: Array<PositionCommand> = dataArray.map(row => {
    const amount = row[1] ? parseInt(row[1].replace('\r', "")) : 0;
    return { commandType: row[0], amount };
  }).filter(it => it.commandType.length > 0);
  const result = positionCalculatorWithAim(input);
  t.is(result, 1544000595);

});
