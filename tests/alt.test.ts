import { alt } from '../src/parser/alt';
import { fromStr } from '../src/parser/from-str';

describe('alt', () => {
  it('Parses with the first parser', async () => {
    // GIVEN:
    // A fooParser,
    const fooParser = fromStr('foo');
    // ...a barParser,
    const barParser = fromStr('bar');
    // ...a parser that combines the two previous parsers,
    const fooOrBarParser = alt(fooParser, barParser);
    // ...and an input that is parser by the first parser
    const input = 'foo';

    // WHEN:
    // The input is parsed with the combined parser
    const [parsed, _remaining] = await fooOrBarParser(input);

    // THEN:
    // The result is the parsed text
    expect(parsed).toBe('foo');
  });

  it('Parses with the second parser', async () => {
    // GIVEN:
    // A fooParser,
    const fooParser = fromStr('foo');
    // ...a barParser,
    const barParser = fromStr('bar');
    // ...a parser that combines the two previous parsers,
    const fooOrBarParser = alt(fooParser, barParser);
    // ...and an input that is parser by the second parser
    const input = 'bar';

    // WHEN:
    // The input is parsed with the combined parser
    const [parsed, _remaining] = await fooOrBarParser(input);

    // THEN:
    // The result is the parsed text
    expect(parsed).toBe('bar');
  });

  it('The remaining is the expected', async () => {
    // GIVEN:
    // A fooParser,
    const fooParser = fromStr('foo');
    // ...a barParser,
    const barParser = fromStr('bar');
    // ...a parser that combines the two previous parsers,
    const fooOrBarParser = alt(fooParser, barParser);
    // ...and an input that is parser by the first parser (with extra text)
    const input = 'fooabc';

    // WHEN:
    // The input is parsed with the combined parser
    const [parsed, remaining] = await fooOrBarParser(input);

    // THEN:
    // The result is the parsed text
    expect(parsed).toBe('foo');
    // ...and the remaining is the expected
    expect(remaining).toBe('abc');
  });

  it('Fails if the input cannot be parsed by any of the parsers', async () => {
    // GIVEN:
    // A fooParser,
    const fooParser = fromStr('foo');
    // ...a barParser,
    const barParser = fromStr('bar');
    // ...a parser that combines the two previous parsers,
    const fooOrBarParser = alt(fooParser, barParser);
    // ...and an input that cannot be parsed by any of the parsers
    const input = 'baz';

    // WHEN:
    // The input is parsed with the combined parser
    const result = fooOrBarParser(input);

    // THEN:
    // The result is rejected
    expect(result).rejects.toMatchObject({
      message: '"bar" expected',
    });
  });
});
