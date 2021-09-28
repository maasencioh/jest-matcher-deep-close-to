export interface IterableObject {
  [k: string]: Iterable;
}
export type Iterable =
  | number
  | Iterable[]
  | Float32Array
  | Float64Array
  | IterableObject
  | string
  | null
  | undefined
  | boolean;

export interface Error {
  reason: string;
  expected: unknown;
  received: unknown;
  index?: number;
  key?: string;
  diff?: number;
}

export interface MatcherResult {
  message: () => string;
  pass: boolean;
}
