import {toBeDeepCloseTo} from '..';
expect.extend({toBeDeepCloseTo});

describe('toBeDeepCloseTo', () => {
    it('numbers', () => {
        expect(42).toBeDeepCloseTo(42, 3);
        expect(42.0003).toBeDeepCloseTo(42.0004, 3);
    });

    it('array', () => {
        expect([42]).toBeDeepCloseTo([42], 3);
        expect([42.0003]).toBeDeepCloseTo([42.0004], 3);
    });

    it('array of arrays', () => {
        expect([[42]]).toBeDeepCloseTo([[42]], 3);
        expect([[42.0003]]).toBeDeepCloseTo([[42.0004]], 3);
    });
});


describe('fails', () => {
    it('numbers', () => {
        expect(43).not.toBeDeepCloseTo(42, 3);
        expect(42.03).not.toBeDeepCloseTo(42.0004, 3);
    });

    it('array', () => {
        expect([43]).not.toBeDeepCloseTo([42], 3);
        expect([42.03]).not.toBeDeepCloseTo([42.0004], 3);
    });

    it('array of arrays', () => {
        expect([[43]]).not.toBeDeepCloseTo([[42]], 3);
        expect([[42.03]]).not.toBeDeepCloseTo([[42.0004]], 3);
    });
});