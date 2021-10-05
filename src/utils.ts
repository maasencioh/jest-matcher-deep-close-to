import {
  stringify,
  matcherHint,
  printExpected,
  printReceived,
  printDiffOrStringify,
  EXPECTED_COLOR,
  RECEIVED_COLOR,
  BOLD_WEIGHT,
} from 'jest-matcher-utils';

import type { Iterable, Error, MatcherResult } from './types';

export function printResponse(
  error: false | Error,
  received: Iterable,
  expected: Iterable,
  precision: number,
): MatcherResult {
  /* istanbul ignore next */
  if (error) {
    return {
      message: () =>
        `${matcherHint('.toBeDeepCloseTo')}\n\n` +
        `${error.reason}: ${printExpected(error.expected)}\n` +
        `Received: ${printReceived(error.received)}\n\n` +
        printCloseTo(received, expected, precision, error),

      pass: false,
    };
  } else {
    return {
      message: () =>
        `${matcherHint('.not.toBeDeepCloseTo')}\n\n` +
        'The two objects are deeply equal:\n' +
        `  ${printExpected(expected)}\n` +
        'Received:\n' +
        `  ${printReceived(received)}`,
      pass: true,
    };
  }
}

// from https://github.com/facebook/jest/blob/e0b33b74b5afd738edc183858b5c34053cfc26dd/packages/expect/src/print.ts#L66
export function printCloseTo(
  received: unknown,
  expected: unknown,
  precision: number,
  error: Error,
): string {
  const { index, key, diff } = error;

  if (diff !== undefined) {
    const receivedDiff = diff;
    const expectedDiff = calculatePrecision(precision);

    const receivedDiffString = stringify(receivedDiff);
    const expectedDiffString = receivedDiffString.includes('e')
      ? // toExponential arg is number of digits after the decimal point.
        expectedDiff.toExponential(0)
      : precision >= 0 && precision < 20
      ? // toFixed arg is number of digits after the decimal point.
        // It may be a value between 0 and 20 inclusive.
        // Implementations may optionally support a larger range of values.
        expectedDiff.toFixed(precision + 1)
      : stringify(expectedDiff);

    const keyString = key !== undefined ? `Key:                 ${key}\n` : '';
    const indexString =
      index !== undefined ? `Index:                 ${stringify(index)}\n` : '';

    return (
      indexString +
      keyString +
      `Expected precision:    ${stringify(precision)}\n` +
      `Expected difference: < ${EXPECTED_COLOR(expectedDiffString)}\n` +
      `Received difference:   ${RECEIVED_COLOR(receivedDiffString)}`
    );
  } else {
    const keyString = key !== undefined ? `Key: ${BOLD_WEIGHT(key)}\n` : '';
    const indexString =
      index !== undefined ? `Index: ${BOLD_WEIGHT(stringify(index))}\n` : '';
    return (
      indexString +
      keyString +
      'Full diff: \n' +
      printDiffOrStringify(expected, received, 'Expected', 'Received', true)
    );
  }
}

export function calculatePrecision(precision: number): number {
  return 0.5 * Math.pow(10, -precision);
}
