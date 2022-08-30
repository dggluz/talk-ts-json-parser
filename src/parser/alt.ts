import { Parser } from './parser';

export type Alt = <A, B> (parserA: Parser<A>, parserB: Parser<B>) => Parser<A | B>;

// export const alt: Alt = ;
