import { nullParser } from '../src/json-parser/null-parser';

describe('nullParser', () => {
  it('Parses "null"', async () => {
    // GIVEN:
    // A "null" string
    const input = 'null';

    // WHEN:
    // Parsing it with the nullParser
    const [parsed, _remaining] = await nullParser(input);

    // THEN:
    // The parsed result is the AST for JsonNull
    expect(parsed).toEqual({
      tag: 'null',
    });
  });

  it('The remaining is the expected one', async () => {
    // GIVEN:
    // A "null" string with extra text
    const input = 'nullabc';

    // WHEN:
    // Parsing it with the nullParser
    const [parsed, remaining] = await nullParser(input);

    // THEN:
    // The parsed result is the AST for JsonNull
    expect(parsed).toEqual({
      tag: 'null',
    });
    // ...and the reamining is the expected
    expect(remaining).toBe('abc');
  });

  it('Fails if the input is shorter than expected', () => {
    // GIVEN:
    // An empty string
    const input = '';

    // WHEN:
    // Parsing it with  the nullParser
    const result = nullParser(input);

    // THEN:
    // The result is a Promise rejected with the message "Unexpected end of input"
    expect(result).rejects.toMatchObject({
      message: 'Unexpected end of input',
    });
  });

  it('Fails if the input is different than expected', () => {
    // GIVEN:
    // An input other than "null"
    const input = 'barrrr';

    // WHEN:
    // Parsing it with  the nullParser
    const result = nullParser(input);

    // THEN:
    // The result is a Promise rejected with the message '"null" expected'
    expect(result).rejects.toMatchObject({
      message: '"null" expected',
    });
  });
});
