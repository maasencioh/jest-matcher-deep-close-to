import { toBeDeepCloseTo } from '..';
expect.extend({ toBeDeepCloseTo });

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

  it('array', () => {
    expect([43]).not.toBeDeepCloseTo([42], 3);
    expect([42.03]).not.toBeDeepCloseTo([42.0004], 3);
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
