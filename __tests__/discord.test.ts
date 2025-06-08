import 'dotenv/config';
import { sendContact, DiscordContactError } from '../src';
import type { ContactOptions } from '../src';

describe('sendContact (Discord)', () => {
    const BASE_OPTS: ContactOptions = {
        email: 'test@local.dev',
        message: 'Hello Test',
    };

    let mockFetch: jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        mockFetch = jest.fn();
        global.fetch = mockFetch;
        process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/test';
    });

    it('resolves when Discord returns ok', async () => {
        mockFetch.mockResolvedValue({ ok: true } as Response);

        await expect(sendContact('discord', BASE_OPTS)).resolves.toBeUndefined();
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('throws DiscordContactError on non-OK response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: async () => 'Server exploded',
        } as Response);

        await expect(sendContact('discord', BASE_OPTS)).rejects.toThrow(DiscordContactError);
    });

    it('throws on missing webhook URL', async () => {
        delete process.env.DISCORD_WEBHOOK_URL;

        await expect(sendContact('discord', BASE_OPTS)).rejects.toThrow(
            new DiscordContactError('Missing or invalid DISCORD_WEBHOOK_URL')
        );
    });

    it('throws on empty email or message', async () => {
        await expect(
            sendContact('discord', { ...BASE_OPTS, email: '' })
        ).rejects.toThrow(new DiscordContactError('The "email" field is required.'));

        await expect(
            sendContact('discord', { ...BASE_OPTS, message: '' })
        ).rejects.toThrow(new DiscordContactError('The "message" field is required.'));
    });
});
