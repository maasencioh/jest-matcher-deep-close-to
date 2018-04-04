/**
 *
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} [decimals=10] decimals
 * @return {{message: (function(): string), pass: boolean}}
 */
export function toBeDeepCloseTo(received, expected, decimals) {
  if (decimals === undefined) {
    decimals = 10;
  }
  var error = recursiveCheck(received, expected, decimals);
  /* istanbul ignore next */
  if (error) {
    return {
      message: () => `${this.utils.matcherHint('.toBeDeepCloseTo')}\n\n` +
        `${error.reason}:\n` +
        `  ${this.utils.printExpected(error.expected)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(error.received)}`,
      pass: false
    };
  } else {
    return {
      message: () => `${this.utils.matcherHint('.not.toBeDeepCloseTo')}\n\n` +
        'The two objects are deeply equal:\n' +
        `  ${this.utils.printExpected(expected)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(received)}`,
      pass: true
    };
  }
}

/**
 * @param {number|Array} actual
 * @param {number|Array} expected
 * @param {number} decimals
 * @return {boolean|{reason, expected, received}}
 */
function recursiveCheck(actual, expected, decimals) {
  if (typeof actual === 'number' && typeof expected === 'number') {
    if (isNaN(actual)) {
      return !isNaN(expected);
    } else if ((Math.abs(actual - expected) <= Math.pow(10, -decimals))) {
      return false;
    } else {
      return {
        reason: `Expected value to be (using ${decimals} decimals)`,
        expected: expected,
        received: actual
      };
    }
  } else if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      return {
        reason: 'The arrays length does not match',
        expected: expected.length,
        received: actual.length
      };
    }
    for (var i = 0; i < actual.length; i++) {
      var error = recursiveCheck(actual[i], expected[i], decimals);
      if (error) return error;
    }
    return false;
  } else if (expected !== null && typeof expected === 'object' && actual !== null && typeof actual === 'object') {
    var actualKeys = Object.keys(actual).sort();
    var expectedKeys = Object.keys(expected).sort();
    if (!(actualKeys.length === expectedKeys.length && actualKeys.every(function (e, i) {
      return e === expectedKeys[i];
    }))) {
      return {
        reason: 'The objects do not have similar keys',
        expected: expectedKeys,
        received: actualKeys,
      };
    }
    for (const prop in expected) {
      var properror = recursiveCheck(actual[prop], expected[prop], decimals);
      if (properror) return properror;
    }
    return false;
  } else {
    // error for all other types
    return {
      reason: 'The current data type is not supported or they do not match',
      expected: typeof expected,
      received: typeof actual
    };
  }
}
