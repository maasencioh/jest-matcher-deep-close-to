declare global {
  namespace jest {
    type Iterable = number | number[] | { [k: string]: Iterable };
    interface Matchers<R> {
      toBeDeepCloseTo: (
        received: Iterable,
        expected: Iterable,
        decimals?: number,
      ) => R;
      toMatchCloseTo: (
        received: Iterable,
        expected: Iterable,
        decimals?: number,
      ) => R;
    }
  }
}
