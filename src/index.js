/**
 *
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} decimals
 * @return {{message: (function(): string), pass: boolean}}
 */
export function toBeDeepCloseTo(received, expected, decimals) {
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
  }

  return {
    message: () => `${this.utils.matcherHint('.not.toBeDeepCloseTo')}\n\n` +
      'The two objects are deeply equal:\n' +
      `  ${this.utils.printExpected(expected)}\n` +
      'Received:\n' +
      `  ${this.utils.printReceived(received)}`,
    pass: true
  };
}

/**
 *
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} decimals
 * @return {{message: (function(): string), pass: boolean}}
 */
export function toMatchCloseTo(received, expected, decimals) {
  var error = recursiveCheck(received, expected, decimals, false);
  /* istanbul ignore next */
  if (error) {
    return {
      message: () => `${this.utils.matcherHint('.toMatchCloseTo')}\n\n` +
        `${error.reason}:\n` +
        `  ${this.utils.printExpected(error.expected)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(error.received)}`,
      pass: false
    };
  }

  return {
    message: () => `${this.utils.matcherHint('.not.toMatchCloseTo')}\n\n` +
      'The observed object is a subset of its target:\n' +
      `  ${this.utils.printExpected(expected)}\n` +
      'Received:\n' +
      `  ${this.utils.printReceived(received)}`,
    pass: true
  };
}

/**
 * @param {number|Array} actual
 * @param {number|Array} expected
 * @param {number} decimals
 * @param {boolean} strict equality or subsets allowed
 * @return {boolean|{reason, expected, received}}
 */
function recursiveCheck(actual, expected, decimals, strict = true) {

  if ( typeof actual !== typeof expected ) {
    return {
      reason: 'The data types do not match',
      expected: typeof expected,
      received: typeof actual
    };
  }
  
  if( typeof actual === 'number' ) {
    return cmpNumbers( actual, expected, decimals );
  }

  if( [actual,expected].every( Array.isArray ) ) {
    return cmpArrays( actual, expected, decimals, strict );
  }

  if( typeof actual === 'object' ) {
    return cmpObjects( actual, expected, decimals, strict );
  }

  // error for all other types
  return {
    reason: 'The current data types are not supported or do not match',
    expected: typeof expected,
    received: typeof actual
  };
}

function cmpNumbers( actual, expected,  decimals ) {
  if (isNaN(actual)) return !isNaN(expected);

  if ((Math.abs(actual - expected) <= Math.pow(10, -decimals))) {
    return false;
  }

  return {
    reason: `Expected value to be (using ${decimals} decimals)`,
    expected: expected,
    received: actual
  };
}

function cmpArrays( actual, expected, decimals, strict ) {
    if (actual.length !== expected.length) {
      return {
        reason: 'The arrays length does not match',
        expected: expected.length,
        received: actual.length
      };
    }

    for (var i = 0; i < actual.length; i++) {
      var error = recursiveCheck(actual[i], expected[i], decimals, strict);
      if (error) return error;
    }

    return false;
}

function cmpObjects( actual, expected, decimals, strict ) {
  var actualKeys = Object.keys(actual).sort();
  var expectedKeys = Object.keys(expected).sort();
  var sameLength = (!strict) || (actualKeys.length === expectedKeys.length);

  const noActualProp = (p) => !Object.prototype.hasOwnProperty.call(actual, p);

  if (!sameLength || expectedKeys.some( noActualProp ) ) {
      return {
        reason: 'The objects do not have similar keys',
        expected: expectedKeys,
        received: actualKeys,
      };
    }

    for (const prop in expected) {
      var properror = recursiveCheck(actual[prop], expected[prop], decimals, strict);
      if (properror) return properror;
    }

    return false;
}
