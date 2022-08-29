import { fooParser } from '../src/other-parsers/foo-parser';

describe('fooParser', () => {
  it('Parses "foo"', async () => {
    // GIVEN:
    // A "foo" string
    const input = 'foo';

    // WHEN:
    // Parsing it with the fooParser
    const [parsed, _remaining] = await fooParser(input);

    // THEN:
    // The parsed result is the string "foo"
    expect(parsed).toBe('foo');
  });

  it('The remaining is the expected one', async () => {
    // GIVEN:
    // A "foo" string with extra text
    const input = 'fooabc';

    // WHEN:
    // Parsing it with the fooParser
    const [parsed, remaining] = await fooParser(input);

    // THEN:
    // The parsed result is the string "foo"
    expect(parsed).toBe('foo');
    // ...and the reamining is the expected
    expect(remaining).toBe('abc');
  });

  it('Fails if the input is shorter than expected', () => {
    // GIVEN:
    // An empty string
    const input = '';

    // WHEN:
    // Parsing it with  the fooParser
    const result = fooParser(input);

    // THEN:
    // The result is a Promise rejected with the message "Unexpected end of input"
    expect(result).rejects.toMatchObject({
      message: 'Unexpected end of input',
    });
  });

  it('Fails if the input is different than expected', () => {
    // GIVEN:
    // An input other than "foo"
    const input = 'bar';

    // WHEN:
    // Parsing it with  the fooParser
    const result = fooParser(input);

    // THEN:
    // The result is a Promise rejected with the message '"foo" expected'
    expect(result).rejects.toMatchObject({
      message: '"foo" expected',
    });
  });
});
