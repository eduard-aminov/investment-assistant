import { TelegramBotApi } from '../api/telegram-bot.api.js';
import { TELEGRAM_BOT_API_URL } from '../../constants.js';
import { Notification } from '../../interfaces/notification.interface.js';

export class TelegramChatNotification implements Notification {
    private telegramBotApi: TelegramBotApi;

    constructor(private chatId: string, token: string) {
        this.telegramBotApi = new TelegramBotApi(TELEGRAM_BOT_API_URL, token);
    }

    async notify(message: string): Promise<void> {
        await this.telegramBotApi.sendMessage(this.chatId, message);
    }
}
