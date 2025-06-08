# universal-contact-notifier
[![npm version](https://img.shields.io/npm/v/universal-contact-notifier.svg)](https://www.npmjs.com/package/universal-contact-notifier)
[![npm downloads](https://img.shields.io/npm/dt/universal-contact-notifier.svg)](https://www.npmjs.com/package/universal-contact-notifier)
[![CI](https://github.com/AlbertoLinde/universal-contact-notifier/actions/workflows/ci.yml/badge.svg)](https://github.com/AlbertoLinde/universal-contact-notifier/actions)
[![License](https://img.shields.io/npm/l/universal-contact-notifier.svg)](LICENSE)


A **generic** Node.js/TypeScript notifier library to send “Contact Form” submissions to messaging channels.  
**v1.0.0** ships with **Discord** support; future adapters (Telegram, Slack, SMS, email, etc.) can be added under `src/sender/`.

- **Required fields**: `email`, `message`
- **Optional fields**: `title`, `name`, `date`, `extraFields` (any key→value), `color`, `username`, `avatarUrl`

Created by **Alberto Linde** (https://albertolinde.com)

---

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Project Structure](#project-structure)
4. [API Reference](#api-reference)
5. [Usage Examples](#usage-examples)
6. [Publishing to NPM](#publishing-to-npm)
7. [Hosting on Git](#hosting-on-git)
8. [Troubleshooting](#troubleshooting)
9. [License](#license)

---

## Installation

```bash
npm install universal-contact-notifier
# or
yarn add universal-contact-notifier
```

---

## Configuration

1. **Create a Discord Webhook**
    - In your Discord server → Channel Settings → Integrations → Webhooks → Create Webhook
    - Copy the **Webhook URL** (e.g. `https://discord.com/api/webhooks/...`)
2. **Set `DISCORD_WEBHOOK_URL`**
    - Locally: copy `.env.example` → `.env`, paste your Webhook URL
    - In production: configure `DISCORD_WEBHOOK_URL` as an environment variable

```text
# .env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/123456789012345678/your-token
```

---

## Project Structure

```
universal-contact-notifier/
├── package.json
├── tsconfig.json
├── .env.example
├── LICENSE
└── src/
├── colors.ts
├── types.ts
├── errors.ts
├── validation.ts
├── builder.ts
├── sender/
│   ├── index.ts
│   └── discord.ts
└── index.ts
```

---

## API Reference

### `sendContact(channel, options): Promise<void>`

- **Parameters**
    - `channel`: currently only `'discord'`
    - `options`: see `ContactOptions`

```ts
interface ContactOptions {
    email: string;                              // required
    message: string;                            // required
    title?: string;                             // optional embed title
    name?: string;                              // optional
    date?: string;                              // optional
    extraFields?: Record<string,string>;        // optional additional fields
    color?: ColorName | string;                 // optional palette key (UPPERCASE) or HEX
    username?: string;                          // optional webhook username override
    avatarUrl?: string;                         // optional webhook avatar URL override
}
```

- **Throws** `DiscordContactError` on validation or network errors

---

## Usage Examples

```ts
import { sendContact, DiscordContactError, COLORS } from 'universal-contact-notifier';

async function main() {
    try {
        await sendContact('discord', {
            email: 'user@example.com',
            message: 'Hello world!',
            title: '🚀 New Inquiry',
            name: 'Alice',
            date: '2025-06-08T14:30:00Z',
            extraFields: { phone: '+1-555-1234' },
            color: 'PURPLE',       // from COLORS: TEAL, RED, BLUE, GREEN, YELLOW, PURPLE, GRAY
            username: 'Contact Bot',
            avatarUrl: 'https://example.com/avatar.png'
        });

        console.log('Notification sent!');
    } catch (err) {
        if (err instanceof DiscordContactError) {
            console.error('Notify failed:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
    }
}

main();
```

---

## Troubleshooting

- **Missing/invalid `DISCORD_WEBHOOK_URL`**  
  Ensure it begins with `https://discord.com/api/webhooks/...`.

- **Validation errors**  
  `DiscordContactError` will explain missing `email` or `message`.

- **Network/Discord errors**  
  Check embed size limits (fields ≤1024 chars, description ≤4096 chars).

- **Node version**  
  Requires Node ≥18 for built-in `fetch`.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
