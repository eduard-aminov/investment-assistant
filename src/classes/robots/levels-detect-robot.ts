import { Robot } from '../../interfaces/robot.interface.js';
import { TelegramChatNotification } from '../notifications/telegram-chat-notification.js';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID } from '../../constants.js';
import { Market } from '../markets/market.js';

export class LevelsDetectRobot implements Robot {
    private telegramNotification: TelegramChatNotification;

    private levels: any = {
        '1D': null,
        '4H': null,
        '2H': null,
        '1H': null,
        '30': null,
        '15': null,
        '5': null,
    };

    constructor(private market: Market) {

        this.telegramNotification = new TelegramChatNotification(TELEGRAM_USER_ID, TELEGRAM_BOT_TOKEN);
    }

    onMessage = (data: any): void => {
        if (data) {
            console.log(data.timeframe);
            this.levels[data.timeframe] = data.value;

            if (!Object.values(this.levels).includes(null)) {
                this.telegramNotification.notify(`${this.market.symbol}:
            5M: ${this.levels['5']}
            15M: ${this.levels['15']}
            30M: ${this.levels['30']}
            1H: ${this.levels['1H']}
            2H: ${this.levels['2H']}
            4H: ${this.levels['4H']}
            1D: ${this.levels['1D']}
            `);
            }
        }
    };
}
