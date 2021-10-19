declare namespace jest {
  interface IterableObject {
    [k: string]: Iterable;
  }
  type Iterable =
    | number
    | Iterable[]
    | Float32Array
    | Float64Array
    | IterableObject
    | string
    | null
    | undefined
    | boolean;

  interface Matchers<R, T> {
    toBeDeepCloseTo: (expected: T | Iterable, decimals?: number) => R;
    toMatchCloseTo: (expected: T | Iterable, decimals?: number) => R;
  }
}
