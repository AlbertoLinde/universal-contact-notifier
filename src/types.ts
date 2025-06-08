/**
 * src/types.ts
 *
 * Shared types for the notifier.
 */
import { ColorName } from './colors';

/** Additional arbitrary key/value pairs for embed fields */
export type ExtraFields = Record<string, string>;

/**
 * Options for sending a contact notification.
 */
export interface ContactOptions {
  /** Sender's email address (required). */
  email: string;
  /** Message body (required). */
  message: string;
  /** Embed title (optional). Defaults to "New Contact Form Submission". */
  title?: string;
  /** Sender's name (optional). */
  name?: string;
  /** Date or ISO string (optional). */
  date?: string;
  /** Extra fields as key/value pairs (optional). */
  extraFields?: ExtraFields;
  /** Embed border color: uppercase palette key or hex string (optional). */
  color?: ColorName | string;
  /** Override the webhook username (optional). */
  username?: string;
  /** Override the webhook avatar URL (optional). */
  avatarUrl?: string;
}
