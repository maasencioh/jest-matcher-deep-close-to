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

  interface Matchers<R> {
    toBeDeepCloseTo: (expected: Iterable, decimals = 2) => R;
    toMatchCloseTo: (expected: Iterable, decimals = 2) => R;
  }
}
