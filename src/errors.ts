/**
 * src/errors.ts
 *
 * Custom error for notifier failures.
 */
export class DiscordContactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DiscordContactError';
  }
}
