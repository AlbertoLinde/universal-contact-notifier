// test-send.ts
import 'dotenv/config';   // loads .env
import { sendContact, DiscordContactError } from './dist/index.js';

(async () => {
    try {
        await sendContact('discord', {
            email: 'test@local.dev',
            message: 'Local integration test!',
            title: '🧪 Local Test',
            name: 'LocalTester',
            extraFields: { env: 'local' },
            color: 'BLUE',
            username: 'Local Bot',
            avatarUrl: 'https://example.com/avatar.png'
        });
        console.log('✅ Sent successfully');
    } catch (err) {
        if (err instanceof DiscordContactError) {
            console.error('❌ DiscordContactError:', err.message);
        } else {
            console.error('❌ Unexpected error:', err);
        }
    }
})();
