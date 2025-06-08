/**
 * src/index.ts
 *
 * Public API: sendContact for various channels.
 */
import { ContactOptions } from './types';
import { DiscordContactError } from './errors';
import { validateEnv, validateOptions } from './validation';
import { adapters } from './sender';

/**
 * Sends a contact notification to the specified channel.
 * @param channel The target channel (e.g. 'discord').
 * @param options ContactOptions for the notification.
 * @throws DiscordContactError on validation or sending failure.
 */
export async function sendContact(
  channel: keyof typeof adapters,
  options: ContactOptions
): Promise<void> {
  try {
    validateEnv();
    validateOptions(options);
    const sender = adapters[channel];
    if (!sender) {
      throw new DiscordContactError(`Unsupported channel: ${channel}`);
    }
    await sender(options);
  } catch (err: any) {
    if (err instanceof DiscordContactError) {
      throw err;
    }
    throw new DiscordContactError(err.message || String(err));
  }
}

export { DiscordContactError } from './errors';
export type { ContactOptions } from './types';
export { adapters as channels } from './sender';
