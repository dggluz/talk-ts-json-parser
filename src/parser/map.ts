import { Parser } from './parser';

export type MapParser = <A, B> (fn: (x: A) => B, parser: Parser<A>) => Parser<B>;

// export const map: MapParser = ;
