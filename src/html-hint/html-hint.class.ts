import { HTMLHint, FormatOptions, RuleSet } from 'htmlhint';
import { IZContentLinter } from '../file-lint/content-linter.interface';

/**
 * Represents an object that can be used to hint html files.
 */
export class ZHtmlHint implements IZContentLinter {
  private _formatOptions: FormatOptions;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._formatOptions = {
      colors: true
    };
  }

  /**
   * Lints the content.
   *
   * @param content The content to check.
   * @param contentPath The path of the content data.
   * @param options The htmlhint options.
   *
   * @returns A promise that resolves if the content is lint free, and rejects if it has lint errors.
   */
  public lint(content: string, contentPath: string, options?: RuleSet): Promise<any> {
    const messages = HTMLHint.verify(content, options);

    if (messages.length > 0) {
      const logs = HTMLHint.format(messages, this._formatOptions);
      return Promise.reject(logs);
    }

    return Promise.resolve(`${contentPath} is lint free.`);
  }
}
