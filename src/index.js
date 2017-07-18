/**
 *
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} decimals
 * @returns {{message: (function(): string), pass: boolean}}
 */
export function toBeDeepCloseTo(received, expected, decimals) {
    var error = recursiveCheck(received, expected, decimals);
    if (error) {
        return {
            message: () => this.utils.matcherHint('.toBeDeepCloseTo') + '\n\n' +
                `${error.reason}:\n` +
                `  ${this.utils.printExpected(error.expected)}\n` +
                'Received:\n' +
                `  ${this.utils.printReceived(error.received)}`,
            pass: false
        };
    } else {
        return {
            message: () => this.utils.matcherHint('.not.toBeDeepCloseTo') + '\n\n' +
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
    if (typeof actual === 'number') {
        if ((Math.abs(actual - expected) <= 10 ** -decimals)) {
            return false;
        } else {
            return {
                reason: `Expected value to be (using ${decimals} decimals)`,
                expected: expected,
                received: actual
            };
        }
    } else if (Array.isArray(actual)) {
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
    } else {
        // error for all other types
        return {
            reason: 'The current data type is not supported',
            expected: 'number or Array',
            received: typeof actual
        };
    }
}
