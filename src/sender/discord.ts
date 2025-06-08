/**
 * src/sender/discord.ts
 *
 * Sends payload to Discord Webhook.
 */
import { DiscordContactError } from '../errors';
import { buildDiscordPayload } from '../builder';
import { ContactOptions } from '../types';

/**
 * Sends a contact notification to Discord.
 * @param opts Contact options
 * @throws DiscordContactError on network or response error.
 */
export async function sendToDiscord(opts: ContactOptions): Promise<void> {
  const payload = buildDiscordPayload(opts);
  const url = process.env.DISCORD_WEBHOOK_URL!;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err: any) {
    throw new DiscordContactError(`Network error: ${err.message}`);
  }
  if (!res.ok) {
    const text = await res.text();
    throw new DiscordContactError(`Discord error ${res.status}: ${text}`);
  }
}
