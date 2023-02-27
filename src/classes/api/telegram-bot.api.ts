import fetch from 'node-fetch';

export class TelegramBotApi {
    constructor(
        private url: string,
        private token: string,
    ) {}

    async sendMessage(to: string, text: string): Promise<void> {
        await fetch(`${this.url + this.token}/sendMessage`, {
            method: 'post',
            body: JSON.stringify({ chat_id: to, text }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
