import { toMatchCloseTo } from '..';

expect.extend({ toMatchCloseTo });

describe('fails', () => {
  it('numbers', () => {
    expect(43).not.toMatchCloseTo(42, 3);
    expect(42.03).not.toMatchCloseTo(42.0004, 3);
  });

  it('numbers default digits', () => {
    expect(42.03).not.toMatchCloseTo(42.04);
  });

  it('strings', () => {
    expect('test').not.toMatchCloseTo('rest');
    expect('test').not.toMatchCloseTo('rest', 3);
  });

  it('booleans', () => {
    expect(true).not.toMatchCloseTo(false);
    expect(true).not.toMatchCloseTo(false, 3);
  });

  it('undefined', () => {
    expect(undefined).not.toMatchCloseTo(null);
    expect(undefined).not.toMatchCloseTo(null, 3);
  });

  it('null', () => {
    expect(null).not.toMatchCloseTo(undefined);
    expect(null).not.toMatchCloseTo(undefined, 3);
  });

  it('array', () => {
    expect([43]).not.toMatchCloseTo([42], 3);
    expect([42.03]).not.toMatchCloseTo([42.0004], 3);
    expect([null, 'hello', true, 42, undefined]).not.toMatchCloseTo(
      [null, 'hello', true, 42, null],
      3,
    );
    expect([null, 'hello', true, 42.03, undefined]).not.toMatchCloseTo(
      [null, 'hello', true, 42.0004, undefined],
      3,
    );
    expect([null, 'hello', true, 42, undefined]).not.toMatchCloseTo(
      [null, 'hello', false, 42, undefined],
      3,
    );
    expect([null, 'hello', true, 42, undefined]).not.toMatchCloseTo(
      [null, 'goodbye', true, 42, undefined],
      3,
    );
    expect([null, 'hello', true, 42, undefined]).not.toMatchCloseTo(
      [{}, 'hello', true, 42, undefined],
      3,
    );
  });

  it('array of arrays', () => {
    expect([[43]]).not.toMatchCloseTo([[42]], 3);
    expect([[42.03]]).not.toMatchCloseTo([[42.0004]], 3);
  });

  it('array length', () => {
    expect([[43]]).not.toMatchCloseTo([[43, 43]], 3);
  });

  it('data type', () => {
    expect([[43]]).not.toMatchCloseTo([['43']], 3);
  });

  it('values in arrays vs array', () => {
    expect([42.03]).not.toMatchCloseTo(42.03, 3);
  });

  it('objects with decimal values', () => {
    expect({ x: 1.48, y: 3.01 }).not.toMatchCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ x: '1.48', y: 3.01 }).not.toMatchCloseTo({ x: 1.5, y: 3 }, 3);
    expect({ y: 3.01 }).not.toMatchCloseTo({ x: 1.5, y: 3 }, 3);
  });

  it('object with arrays with mismatched lengths', () => {
    expect({ x: [1.48], y: [3.01, 3.02] }).not.toMatchCloseTo(
      { x: 1.5, y: 3 },
      3,
    );
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
    expect({ x: { a: 1.4999 }, y: 3.00001 }).toMatchCloseTo(
      { x: { a: 1.5 }, y: 3 },
      3,
    );
  });

  it('object with NaN', () => {
    expect({ x: 1.4999, y: NaN }).toMatchCloseTo({ x: 1.5, y: NaN }, 3);
    expect({ x: 1.4999, y: 3 }).not.toMatchCloseTo({ x: 1.5, y: NaN }, 3);
  });

  it('object with Infinity', () => {
    expect({ x: Infinity, y: -Infinity }).toMatchCloseTo(
      { x: Infinity, y: -Infinity },
      3,
    );
    expect({ x: 9999 }).not.toMatchCloseTo({ x: Infinity }, 3);
    expect({ x: Infinity }).not.toMatchCloseTo({ x: -Infinity }, 3);
  });

  it('dissimilar objects', () => {
    expect({ x: 1.4999, y: NaN, z: 100 }).toMatchCloseTo({ x: 1.5, y: NaN }, 3);
    expect({ x: 1.4999, y: NaN, z: 100 }).toMatchCloseTo({ x: 1.5, z: 100 }, 3);
  });

  it('explicit/implicit undefined', () => {
    expect({ x: 1.4999, y: undefined, z: 100 }).toMatchCloseTo(
      { y: undefined, z: 100 },
      3,
    );
    expect({ x: 1.4999, y: undefined, z: 100 }).toMatchCloseTo(
      { x: 1.5, z: 100 },
      3,
    );
  });
});
