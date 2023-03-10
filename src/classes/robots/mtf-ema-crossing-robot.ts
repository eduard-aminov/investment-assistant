import { Robot } from '../../interfaces/robot.interface.js';
import { TelegramChatNotification } from '../notifications/telegram-chat-notification.js';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID } from '../../constants.js';
import { Market } from '../markets/market.js';
import { MtfEmaIndicatorValues } from '../indicators/custom-indicators/mtf-ema-indicator.js';

export class MtfEmaCrossingRobot implements Robot {
    private telegramNotification: TelegramChatNotification;

    private previousData: MtfEmaIndicatorValues | undefined;
    private previousMessage: string | undefined;

    constructor(private market: Market) {

        this.telegramNotification = new TelegramChatNotification(TELEGRAM_USER_ID, TELEGRAM_BOT_TOKEN);
    }

    onMessage = (data: MtfEmaIndicatorValues): void => {
        console.log(data);
        const crossingTimeframes: Array<Array<keyof MtfEmaIndicatorValues>> = [
            ['M1', 'M5'],
            ['M5', 'M15'],
            ['M15', 'M30'],
            ['M30', 'H1'],
            ['H1', 'H2'],
            ['H2', 'H4'],
            ['H4', 'D1'],
        ];

        for (const [timeframe1, timeframe2] of crossingTimeframes) {
            if (this.isCrossing(data, this.previousData, timeframe1!, timeframe2!)) {
                const message = this.buildCrossingMessage(timeframe1!, timeframe2!);
                if (this.previousMessage !== message) {
                    this.telegramNotification.notify(message);
                    this.previousMessage = message;
                }
            }
        }

        this.previousData = data;
    };

    private buildCrossingMessage(timeframe1: keyof MtfEmaIndicatorValues, timeframe2: keyof MtfEmaIndicatorValues): string {
        return `MTF EMA 163 - ${this.market.symbol} - пересечение ${timeframe1} ${timeframe2}`;
    }

    private isCrossing(
        currentData: MtfEmaIndicatorValues,
        previousData: MtfEmaIndicatorValues | undefined,
        timeframe1: keyof MtfEmaIndicatorValues,
        timeframe2: keyof MtfEmaIndicatorValues
    ): boolean {
        if (!previousData) {
            return false;
        }
        return (previousData[timeframe1]! <= previousData[timeframe2]!) && (currentData[timeframe1]! > currentData[timeframe2]!) ||
            (previousData[timeframe1]! >= previousData[timeframe2]!) && (currentData[timeframe1]! < currentData[timeframe2]!);
    }
}
