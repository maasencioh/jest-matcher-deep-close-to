import type { Error, IterableObject } from './types';
import { calculatePrecision } from './utils';

type CmpResult = false | Error;

function cmpNumber(
  received: number,
  expected: number,
  precision: number,
): CmpResult {
  if (isNaN(received)) {
    return isNaN(expected) ? false : { reason: 'Expected', expected, received };
  }

  if (!isFinite(received)) {
    return received === expected
      ? false
      : { reason: 'Expected', expected, received };
  }

  if (Math.abs(received - expected) <= calculatePrecision(precision)) {
    return false;
  }

  return {
    reason: 'Expected',
    expected,
    received,
    diff: Math.abs(received - expected),
  };
}

function cmpEqual<T>(received: T, expected: T): CmpResult {
  if (received === expected) return false;

  return {
    reason: `The ${typeof expected}s do not match`,
    expected,
    received,
  };
}

function cmpArray(
  received: unknown[],
  expected: unknown[],
  precision: number,
  strict: boolean,
): CmpResult {
  const receivedLength = received.length;
  const expectedLength = expected.length;
  if (receivedLength !== expectedLength) {
    return {
      reason: 'The arrays length does not match',
      expected: expectedLength,
      received: receivedLength,
    };
  }

  for (let i = 0; i < receivedLength; i++) {
    const error = recursiveCheck(received[i], expected[i], precision, strict);
    if (error) {
      return { ...error, index: i };
    }
  }

  return false;
}

function cmpObject(
  received: Record<string, unknown>,
  expected: Record<string, unknown>,
  precision: number,
  strict: boolean,
): CmpResult {
  const sorter = (a: string, b: string) => a.localeCompare(b);

  const receivedKeys = Object.keys(received).sort(sorter);
  const expectedKeys = Object.keys(expected).sort(sorter);

  const sameLength = !strict || receivedKeys.length === expectedKeys.length;

  if (
    !sameLength ||
    expectedKeys.some((e) => !Object.prototype.hasOwnProperty.call(received, e))
  ) {
    return {
      reason: 'The objects do not have similar keys',
      expected: expectedKeys,
      received: receivedKeys,
    };
  }

  for (const prop in expected) {
    const propError = recursiveCheck(
      (received as IterableObject)[prop],
      (expected as IterableObject)[prop],
      precision,
      strict,
    );
    if (propError) return { ...propError, key: prop };
  }

  return false;
}

/**
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} precision
 * @param {boolean} strict equality or subsets allowed
 * @return {boolean|{reason, expected, received}}
 */
export function recursiveCheck(
  received: unknown,
  expected: unknown,
  precision: number,
  strict = true,
): false | Error {
  // Received and expected are numbers
  if (typeof received === 'number' && typeof expected === 'number') {
    return cmpNumber(received, expected, precision);
  }

  if (
    (typeof received === 'string' && typeof expected === 'string') ||
    (typeof received === 'boolean' && typeof expected === 'boolean')
  ) {
    return cmpEqual(received, expected);
  }

  // Received and expected are arrays
  if (isArray(received) && isArray(expected)) {
    return cmpArray(received, expected, precision, strict);
  }

  /* Received and expected are either
   * 1) both explicitly set as undefined
   * 2) undefined properties of an object, where the received value may be implicitly undefined
   */
  if (expected === undefined && received === undefined) return false;

  // Received and expected are null
  if (expected === null && received === null) return false;

  // Received and expected are objects
  if (
    expected !== null &&
    typeof expected === 'object' &&
    !Array.isArray(received) &&
    received !== null &&
    typeof received === 'object' &&
    !Array.isArray(expected)
  ) {
    return cmpObject(
      received as Record<string, unknown>,
      expected as Record<string, unknown>,
      precision,
      strict,
    );
  }

  // Error for all other types
  return {
    reason: 'The current data type is not supported or they do not match',
    expected: typeof expected,
    received: typeof received,
  };
}

function isArray(value: unknown): value is unknown[] {
  return (
    Array.isArray(value) ||
    value instanceof Float32Array ||
    value instanceof Float64Array
  );
}
