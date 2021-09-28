declare namespace jest {
  type Iterable =
    | number
    | Iterable[]
    | { [k: string]: Iterable }
    | string
    | null
    | undefined
    | boolean;

  interface Matchers<R> {
    toBeDeepCloseTo: (expected: Iterable, decimals?: number) => R;
    toMatchCloseTo: (expected: Iterable, decimals?: number) => R;
  }
}
