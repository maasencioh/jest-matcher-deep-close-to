# Changelog

### [3.0.1](https://www.github.com/maasencioh/jest-matcher-deep-close-to/compare/v3.0.0...v3.0.1) (2021-10-07)


### Bug Fixes

* print correct diff in error message ([896ccad](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/896ccad4fedf51e63beef420410005f950747d69))
* **typings:** include Jest extensions from lib's entrypoint ([9b76880](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/9b768809dbee9fbd7986e1ea58078a32da1fb41a))

## [3.0.0](https://www.github.com/maasencioh/jest-matcher-deep-close-to/compare/v2.0.1...v3.0.0) (2021-09-28)


### ⚠ BREAKING CHANGES

* changes the precision from 1*10^-x to be 5*10^-(x+1)

### Features

* format response similar to jest-closeTo ([bfcef08](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/bfcef0822b67f297ace4530a114a441f1602d5f1))
* support typed arrays ([b43349a](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/b43349a515104bfa5d904c94ea20858b3ae60a6b)), closes [#20](https://www.github.com/maasencioh/jest-matcher-deep-close-to/issues/20)


### Bug Fixes

* add ambient jest to build ([31600ba](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/31600baf998952f690da42370532fd7ca8d58737)), closes [#19](https://www.github.com/maasencioh/jest-matcher-deep-close-to/issues/19)
* remove package-lock ([02409ca](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/02409cab7f87d8823fc9fcc754fe6ef025f1f372))


### Miscellaneous Chores

* update default precision from jest-closeTo ([880d084](https://www.github.com/maasencioh/jest-matcher-deep-close-to/commit/880d084990b5f385ccbf1b7659f070c53f3c6d52)), closes [#23](https://www.github.com/maasencioh/jest-matcher-deep-close-to/issues/23)
