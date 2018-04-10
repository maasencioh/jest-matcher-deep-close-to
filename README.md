# jest-matcher-deep-close-to

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][codecov-image]][codecov-url]
  [![npm download][download-image]][download-url]

Extend jest to assert arrays and objects with approximate values.

## Installation

`$ npm install --save jest-matcher-deep-close-to`

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

[npm-image]: https://img.shields.io/npm/v/jest-matcher-deep-close-to.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jest-matcher-deep-close-to
[travis-image]: https://img.shields.io/travis/maasencioh/jest-matcher-deep-close-to/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/maasencioh/jest-matcher-deep-close-to
[codecov-image]: https://img.shields.io/codecov/c/github/maasencioh/jest-matcher-deep-close-to.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/maasencioh/jest-matcher-deep-close-to
[download-image]: https://img.shields.io/npm/dm/jest-matcher-deep-close-to.svg?style=flat-square
[download-url]: https://npmjs.org/package/jest-matcher-deep-close-to
