/* eslint-disable require-jsdoc */
import { dump } from 'js-yaml';
import { ZYamlLint } from './yaml-lint.class';

describe('ZJsonLint', () => {
  let yaml: any;

  beforeEach(() => {
    yaml = {
      keyA: 'key-a',
      keyB: 'key-b'
    };
  });

  function createTestTarget() {
    return new ZYamlLint();
  }

  it('returns a resolved promise if the json is valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint(dump(yaml))).resolves.toBeTruthy();
  });

  it('returns a rejected promise if the json is not valid.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    await expect(target.lint('brackets: invalid: "Square [brackets] can not go in the middle of strings"')).rejects.toBeTruthy();
  });
});
