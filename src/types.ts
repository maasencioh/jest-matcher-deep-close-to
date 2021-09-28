export type Iterable =
  | number
  | Iterable[]
  | { [k: string]: Iterable }
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
