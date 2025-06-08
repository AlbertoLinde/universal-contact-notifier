import 'dotenv/config';
import { sendContact, DiscordContactError } from '../dist/index.js';
import type { ContactOptions } from '../dist/types.js';

// mock global.fetch
const globalAny: any = global;
globalAny.fetch = jest.fn();

describe('sendContact discord adapter', () => {
    const BASE_OPTS: ContactOptions = {
        email: 'test@local.dev',
        message: 'Hello Test'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/test';
    });

    it('resolves when Discord returns ok', async () => {
        (fetch as jest.Mock).mockResolvedValue({ ok: true });
        await expect(sendContact('discord', BASE_OPTS)).resolves.toBeUndefined();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('throws DiscordContactError on non-OK response', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal',
            text: async () => 'fail'
        });
        await expect(sendContact('discord', BASE_OPTS)).rejects.toThrow(DiscordContactError);
    });

    it('throws on missing webhook URL', async () => {
        delete process.env.DISCORD_WEBHOOK_URL;
        await expect(sendContact('discord', BASE_OPTS)).rejects.toThrow(/Missing or invalid/);
    });

    it('throws on empty email or message', async () => {
        await expect(sendContact('discord', { ...BASE_OPTS, email: '' })).rejects.toThrow(/email/);
        await expect(sendContact('discord', { ...BASE_OPTS, message: '' })).rejects.toThrow(/message/);
    });
});
