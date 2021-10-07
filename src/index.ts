// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./jest.d.ts" />

import { recursiveCheck } from './recursiveCheck';
import type { Iterable, MatcherResult } from './types';
import { printResponse } from './utils';

export function toBeDeepCloseTo(
  received: Iterable,
  expected: Iterable,
  precision = 2,
): MatcherResult {
  const error = recursiveCheck(received, expected, precision);
  return printResponse(error, received, expected, precision);
}

export function toMatchCloseTo(
  received: Iterable,
  expected: Iterable,
  precision = 2,
): MatcherResult {
  const error = recursiveCheck(received, expected, precision, false);
  return printResponse(error, received, expected, precision);
}
