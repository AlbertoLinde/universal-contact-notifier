/**
 * src/validation.ts
 *
 * Validates environment variables and options.
 */
import { ContactOptions } from './types';
import { DiscordContactError } from './errors';

/** Ensures DISCORD_WEBHOOK_URL is present and valid. */
export function validateEnv(): void {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url || !url.startsWith('https://discord.com/api/webhooks/')) {
    throw new DiscordContactError('Missing or invalid DISCORD_WEBHOOK_URL');
  }
}

/** Ensures required fields are non-empty. */
export function validateOptions(opts: ContactOptions): void {
  if (!opts.email?.trim()) {
    throw new DiscordContactError('The "email" field is required.');
  }
  if (!opts.message?.trim()) {
    throw new DiscordContactError('The "message" field is required.');
  }
}
