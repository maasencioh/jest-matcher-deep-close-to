import {
  matcherHint,
  printExpected,
  printReceived,
  printDiffOrStringify,
} from 'jest-matcher-utils';

import { recursiveCheck, Iterable, Error } from './recursiveCheck';

export interface MatcherResult {
  message: () => string;
  pass: boolean;
}

function printResponse(
  error: false | Error,
  received: Iterable,
  expected: Iterable,
): MatcherResult {
  /* istanbul ignore next */
  if (error) {
    return {
      message: () =>
        `${matcherHint('.toBeDeepCloseTo')}\n\n` +
        `${error.reason}:\n` +
        `  ${printExpected(error.expected)}\n` +
        'Received:\n' +
        `  ${printReceived(error.received)}\n` +
        `Full diff: \n${printDiffOrStringify(
          expected,
          received,
          'Expected',
          'Received',
          true,
        )}`,
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

export function toBeDeepCloseTo(
  received: Iterable,
  expected: Iterable,
  decimals?: number,
): MatcherResult {
  if (decimals === undefined) {
    decimals = 10;
  }
  const error = recursiveCheck(received, expected, decimals);
  return printResponse(error, received, expected);
}

export function toMatchCloseTo(
  received: Iterable,
  expected: Iterable,
  decimals?: number,
): MatcherResult {
  if (decimals === undefined) {
    decimals = 10;
  }
  const error = recursiveCheck(received, expected, decimals, false);
  return printResponse(error, received, expected);
}
