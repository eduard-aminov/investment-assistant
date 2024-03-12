import { Robot } from '../../interfaces/robot.interface.js';
import { TelegramChatNotification } from '../notifications/telegram-chat-notification.js';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID } from '../../constants.js';
import { Market } from '../markets/market.js';

interface SmartMoneyRobotData {
    timeframe: string;
    value: {
        premiumValue: number;
        discountValue: number;
        boses: { value: number; direction: string; }[];
    }
}

export class SmartMoneyRobot implements Robot {
    private telegramNotification: TelegramChatNotification;

    private state: any = {};

    private initialSkipped = false;

    constructor(private market: Market) {

        this.telegramNotification = new TelegramChatNotification(TELEGRAM_USER_ID, TELEGRAM_BOT_TOKEN);
    }

    onMessage = (data: SmartMoneyRobotData): void => {

        if (data && !this.initialSkipped) {
            this.initialSkipped = true;
            return;
        }

        if (data && this.initialSkipped) {

            if (JSON.stringify(this.state[data.timeframe]?.boses) !== JSON.stringify(data.value.boses)) {

                this.state[data.timeframe] = data.value;

                data.value.boses.forEach(bos => {
                    if (bos.direction === 'L' && ((data.value.premiumValue - bos.value) < (bos.value - data.value.discountValue))) {
                        this.telegramNotification.notify(`[${this.market.symbol} - ${data.timeframe}]: BOS LONG`);
                    }

                    if (bos.direction === 'S' && ((bos.value - data.value.discountValue) < (data.value.premiumValue - bos.value))) {
                        this.telegramNotification.notify(`[${this.market.symbol} - ${data.timeframe}]: BOS SHORT`);
                    }
                })
            }
        }
    };
}
