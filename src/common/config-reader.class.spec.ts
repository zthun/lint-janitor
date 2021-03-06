/* eslint-disable require-jsdoc */
import { readFile } from 'fs';
import { IZConfigParser } from './config-parser.interface';
import { ZConfigReader } from './config-reader.class';

jest.mock('fs');

describe('ZConfigReader', () => {
  let config: string;
  let options: any;
  let parser: IZConfigParser;

  beforeEach(() => {
    config = 'config.json';

    options = {
      key: 'value'
    };

    parser = {} as any;
    parser.parse = jest.fn(() => Promise.resolve(options));

    (readFile as any).mockImplementation((f, o, cb) => cb(null, JSON.stringify(options)));
  });

  function createTestTarget() {
    return new ZConfigReader(parser);
  }

  it('returns the options parsed from the parser.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read(config);
    // Assert
    expect(actual).toEqual(options);
  });

  it('returns a rejected promise if the config cannot be read.', async () => {
    // Arrange
    const target = createTestTarget();
    (readFile as any).mockImplementation((f, o, cb) => cb('Cannot read file', null));
    // Act
    // Assert
    await expect(target.read(config)).rejects.toBeTruthy();
  });
});
