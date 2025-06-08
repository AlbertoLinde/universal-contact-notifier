/**
 * src/sender/index.ts
 *
 * Registry of channel adapters.
 */
import { sendToDiscord } from './discord';
export const adapters = { discord: sendToDiscord };
