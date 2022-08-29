export type Parser <T> = (input: string) => Promise<[T, string]>;
