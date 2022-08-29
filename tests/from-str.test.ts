import { fromStr } from '../src/parser/from-str';

describe('fromStr', () => {
  it('Parses the expected string', async () => {
    // GIVEN:
    // A "bar" parser
    const barParser = fromStr('bar');
    // ...and a "bar" input
    const input = 'bar';

    // WHEN:
    // Parsing it with the barParser
    const [parsed, _remaining] = await barParser(input);

    // THEN:
    // The parsed result is the string "bar"
    expect(parsed).toBe('bar');
  });

  it('The remaining is the expected one', async () => {
    // GIVEN:
    // A "bar" parser
    const barParser = fromStr('bar');
    // ...and a "bar" input with extra text
    const input = 'barabc';

    // WHEN:
    // Parsing it with the barParser
    const [parsed, remaining] = await barParser(input);

    // THEN:
    // The parsed result is the string "bar"
    expect(parsed).toBe('bar');
    // ...and the reamining is the expected
    expect(remaining).toBe('abc');
  });

  it('Fails if the input is shorter than expected', () => {
    // GIVEN:
    // A "bar" parser
    const barParser = fromStr('bar');
    // ...and an empty string
    const input = '';

    // WHEN:
    // Parsing it with  the barParser
    const result = barParser(input);

    // THEN:
    // The result is a Promise rejected with the message "Unexpected end of input"
    expect(result).rejects.toMatchObject({
      message: 'Unexpected end of input',
    });
  });

  it('Fails if the input is different than expected', () => {
    // GIVEN:
    // A "bar" parser
    const barParser = fromStr('bar');
    // ...and an input other than "bar"
    const input = 'foo';

    // WHEN:
    // Parsing it with  the barParser
    const result = barParser(input);

    // THEN:
    // The result is a Promise rejected with the message '"bar" expected'
    expect(result).rejects.toMatchObject({
      message: '"bar" expected',
    });
  });
});
