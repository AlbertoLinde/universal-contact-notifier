/**
 * src/builder.ts
 *
 * Builds the payload for Discord Webhook.
 */
import { ContactOptions } from './types';
import { COLORS } from './colors';

/** Parses a color name or hex string into a numeric value. */
function parseColor(input?: string): number {
  if (input) {
    if (COLORS[input as keyof typeof COLORS] !== undefined) {
      return COLORS[input as keyof typeof COLORS];
    }
    const hex = input.replace(/^#/, '');
    const num = parseInt(hex, 16);
    if (!isNaN(num)) return num;
  }
  return COLORS.TEAL;
}

/**
 * Builds the JSON payload for a Discord embed.
 */
export function buildDiscordPayload(opts: ContactOptions): any {
  const embedTitle = opts.title?.trim() || 'New Contact Form Submission';
  const color = parseColor(opts.color);
  const embed: any = {
    title: embedTitle,
    color,
    fields: [{ name: 'Email', value: opts.email.trim(), inline: true }],
    description: opts.message.trim(),
    timestamp: new Date().toISOString(),
    footer: { text: 'YourCompany • Contact Form', icon_url: '' }
  };

  if (opts.name?.trim()) {
    embed.fields.unshift({ name: 'Name', value: opts.name.trim(), inline: true });
  }
  if (opts.date?.trim()) {
    const d = new Date(opts.date.trim());
    const val = isNaN(d.getTime()) ? opts.date.trim() : d.toISOString();
    embed.fields.push({ name: 'Date', value: val, inline: true });
  }
  for (const [k, v] of Object.entries(opts.extraFields || {})) {
    embed.fields.push({ name: k, value: v, inline: true });
  }

  const username = opts.username?.trim() || 'Notifier';
  const avatar_url = opts.avatarUrl?.trim() || '';

  return {
    username,
    avatar_url,
    embeds: [embed]
  };
}