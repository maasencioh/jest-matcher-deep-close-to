import { toBeDeepCloseTo, toMatchCloseTo } from '..';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('toBeDeepCloseTo', () => {
  it('numbers', () => {
    expect(42).toBeDeepCloseTo(42, 3);
    expect(42.0003).toBeDeepCloseTo(42.0004, 3);
  });

  it('numbers defaut digits', () => {
    expect(42).toBeDeepCloseTo(42);
  });

  it('strings', () => {
    expect('test').toBeDeepCloseTo('test');
    expect('test').toBeDeepCloseTo('test', 3);
  });

  it('booleans', () => {
    expect(true).toBeDeepCloseTo(true);
    expect(false).toBeDeepCloseTo(false, 3);
  });

  it('null', () => {
    expect(null).toBeDeepCloseTo(null);
    expect(null).toBeDeepCloseTo(null, 3);
  });

  it('array', () => {
    expect([42]).toBeDeepCloseTo([42], 3);
    expect([42.0003]).toBeDeepCloseTo([42.0004], 3);
    expect([null, 'hello', true, 42.0003]).toBeDeepCloseTo([null, 'hello', true, 42.0004], 3);
  });

  it('array of arrays', () => {
    expect([[42]]).toBeDeepCloseTo([[42]], 3);
    expect([[42.0003]]).toBeDeepCloseTo([[42.0004]], 3);
  });

  it('object with decimal values', () => {
    expect({ x: 1.4999, y: 3.00001 }).toBeDeepCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ x: { a: 1.4999 }, y: 3.00001 }).toBeDeepCloseTo({ x: { a: 1.5 }, y: 3 }, 3);
  });

  it('object with NaN', () => {
    expect({ x: 1.4999, y: NaN }).toBeDeepCloseTo({ x: 1.5, y: NaN }, 3);
    expect({ x: 1.4999, y: 3 }).not.toBeDeepCloseTo({ x: 1.5, y: NaN }, 3);
  });
});


describe('fails', () => {
  it('numbers', () => {
    expect(43).not.toBeDeepCloseTo(42, 3);
    expect(42.03).not.toBeDeepCloseTo(42.0004, 3);
  });

  it('numbers defaut digits', () => {
    expect(42.0003).not.toBeDeepCloseTo(42.0004);
  });

  it('strings', () => {
    expect('test').not.toBeDeepCloseTo('rest');
    expect('test').not.toBeDeepCloseTo('rest', 3);
  });

  it('booleans', () => {
    expect(true).not.toBeDeepCloseTo(false);
    expect(true).not.toBeDeepCloseTo(false, 3);
  });

  it('null', () => {
    expect(null).not.toBeDeepCloseTo(undefined);
    expect(null).not.toBeDeepCloseTo(undefined, 3);
  });

  it('array', () => {
    expect([43]).not.toBeDeepCloseTo([42], 3);
    expect([42.03]).not.toBeDeepCloseTo([42.0004], 3);
    expect([null, 'hello', true, 42.03]).not.toBeDeepCloseTo([null, 'hello', true, 42.0004], 3);
    expect([null, 'hello', true, 42]).not.toBeDeepCloseTo([null, 'hello', false, 42], 3);
    expect([null, 'hello', true, 42]).not.toBeDeepCloseTo([null, 'goodbye', true, 42], 3);
    expect([null, 'hello', true, 42]).not.toBeDeepCloseTo([{}, 'hello', true, 42], 3);
  });

  it('array of arrays', () => {
    expect([[43]]).not.toBeDeepCloseTo([[42]], 3);
    expect([[42.03]]).not.toBeDeepCloseTo([[42.0004]], 3);
  });

  it('array length', () => {
    expect([[43]]).not.toBeDeepCloseTo([[43, 43]], 3);
  });

  it('data type', () => {
    expect([[43]]).not.toBeDeepCloseTo([['43']], 3);
  });

  it('values in arrays vs array', () => {
    expect([42.03]).not.toBeDeepCloseTo(42.03, 3);
  });

  it('objects with decimal values', () => {
    expect({ x: 1.48, y: 3.01 }).not.toBeDeepCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ x: '1.48', y: 3.01 }).not.toBeDeepCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ y: 3.01 }).not.toBeDeepCloseTo({ x: 1.5, y: 3 }, 3);
  });

  it('object with arrays with mismatched lengths', () => {
    expect({ x: [1.48], y: [3.01, 3.02] }).not.toBeDeepCloseTo({ x: 1.5, y: 3 }, 3);
  });
});

describe('toMatchCloseTo', () => {
  it('numbers', () => {
    expect(42).toMatchCloseTo(42, 3);
    expect(42.0003).toMatchCloseTo(42.0004, 3);
  });

  it('array', () => {
    expect([42]).toMatchCloseTo([42], 3);
    expect([42.0003]).toMatchCloseTo([42.0004], 3);
  });

  it('array of arrays', () => {
    expect([[42]]).toMatchCloseTo([[42]], 3);
    expect([[42.0003]]).toMatchCloseTo([[42.0004]], 3);
  });

  it('object with decimal values', () => {
    expect({ x: 1.4999, y: 3.00001 }).toMatchCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ x: { a: 1.4999 }, y: 3.00001 }).toMatchCloseTo({ x: { a: 1.5 }, y: 3 }, 3);
  });

  it('object with NaN', () => {
    expect({ x: 1.4999, y: NaN }).toMatchCloseTo({ x: 1.5, y: NaN }, 3);
    expect({ x: 1.4999, y: 3 }).not.toMatchCloseTo({ x: 1.5, y: NaN }, 3);
  });

  it('dissimilar objects', () => {
    expect({ x: 1.4999, y: NaN, z: 100 }).toMatchCloseTo({ x: 1.5, y: NaN }, 3);
    expect({ x: 1.4999, y: NaN, z: 100 }).toMatchCloseTo({ x: 1.5, z: 100 }, 3);
  });
});
