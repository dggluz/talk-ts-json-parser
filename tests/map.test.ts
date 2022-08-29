import { fromStr } from '../src/parser/from-str';
import { map } from '../src/parser/map';
import { Parser } from '../src/parser/parser';

const eq = (x: unknown, y: unknown) => {
  try {
    expect(x).toEqual(y);
    return true;
  } catch (_) {
    return false;
  }
};

const createParsersComparator = (inputs: string[]) =>
  (p1: Parser<unknown>, p2: Parser<unknown>) =>
    Promise
      .all(inputs.map(async (input) => {
        const [resultP1, resultP2] = await Promise.allSettled([
          p1(input),
          p2(input),
        ]);

        return eq(resultP1, resultP2);
      }))
      .then(results => results.every(x => x))
  ;

describe('Parser map', () => {
  const eqParsers = createParsersComparator([
    'foo',
    'foobarbaz',
    'bar',
    '',
  ]);

  // Testing the functor laws
  it('map(id, Parser<T>) === Parser<T>', () => {
    // GIVEN:
    // The identity function
    const id = <T> (x: T) => x;
    // ...and a parser
    const fooParser = fromStr('foo');

    // WHEN:
    // calling map with the id function and the parser
    const fooParser2 = map(id, fooParser);

    // THEN:
    // The result is equivalent to the first parser
    expect(eqParsers(fooParser, fooParser2)).resolves.toBe(true);
  });

  it('map(f . g, Parser<T>) === map(f, map(g, Parser<T>))', () => {
    // GIVEN:
    // A function,
    const f = (x: number) => x ** 2;
    // ...another function
    const g = (x: string) => x.length;
    // ...and a parser
    const fooParser = fromStr('foo');

    // WHEN:
    // calling map with the composition of the functions
    const fgParser1 = map((x: string) => f(g(x)), fooParser);
    // ...and mapping with a function over the mapping of the other functions
    const fgParser2 = map(f, map(g, fooParser));

    // THEN:
    // The resulting parsers are equivalent
    expect(eqParsers(fgParser1, fgParser2)).resolves.toBe(true);
  });
});
