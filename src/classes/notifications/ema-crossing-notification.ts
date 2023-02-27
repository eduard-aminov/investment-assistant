import { TelegramChatNotification } from './telegram-chat-notification.js';

export class EmaCrossingNotification {
    private fastEma: number | undefined;
    private slowEma: number | undefined;

    private get message(): string {
        return `Fast EMA${this.fastEma} crossed slow EMA${this.slowEma}`;
    }

    constructor(private telegramChatNotification: TelegramChatNotification) {}

    setFastEma(ema: number): this {
        this.fastEma = ema;
        return this;
    }

    setSlowEma(ema: number): this {
        this.slowEma = ema;
        return this;
    }

    async notify(): Promise<void> {
        await this.telegramChatNotification.notify(this.message);
    }
}
