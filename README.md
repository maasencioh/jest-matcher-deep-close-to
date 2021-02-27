# jest-matcher-deep-close-to

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Extend jest to assert arrays and objects with approximate values.

## Installation

`$ npm i -D jest-matcher-deep-close-to`

## Usage

```js
import {toBeDeepCloseTo,toMatchCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo, toMatchCloseTo});

describe('test myModule', () => {
    it('should return 42', () => {
        expect([42.0003]).toBeDeepCloseTo([42.0004], 3);
    });
});

describe('test myModule', () => {
    it('should return 42', () => {
        expect({ foo: 42.0003,  bar: "xxx", baz: "yyy"})
            .toMatchCloseTo({ foo: 42.004, bar: "xxx" }, 3);
    });
});
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/jest-matcher-deep-close-to.svg
[npm-url]: https://www.npmjs.com/package/jest-matcher-deep-close-to
[ci-image]: https://github.com/maasencioh/jest-matcher-deep-close-to/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/maasencioh/jest-matcher-deep-close-to/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/jest-matcher-deep-close-to.svg
[download-url]: https://www.npmjs.com/package/jest-matcher-deep-close-to
