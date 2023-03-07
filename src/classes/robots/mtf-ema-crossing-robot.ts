import { Robot } from '../../interfaces/robot.interface.js';
import { TelegramChatNotification } from '../notifications/telegram-chat-notification.js';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID } from '../../constants.js';
import { Market } from '../markets/market.js';
import { MtfEmaIndicator, MtfEmaIndicatorValues } from '../indicators/custom-indicators/mtf-ema-indicator.js';
import { TradingViewApi } from '../api/trading-view.api.js';
import { Chart } from '../chart/chart.js';

export class MtfEmaCrossingRobot implements Robot {

    private chart: Chart;
    private mtfEmaIndicator: MtfEmaIndicator;
    private telegramNotification: TelegramChatNotification;

    private previousData: MtfEmaIndicatorValues | undefined;

    constructor(tradingViewApi: TradingViewApi, private market: Market) {

        this.telegramNotification = new TelegramChatNotification(TELEGRAM_USER_ID, TELEGRAM_BOT_TOKEN);

        this.mtfEmaIndicator = new MtfEmaIndicator(
            `MTFEMA_163_${market.symbol}`,
            {
                length: 163,
                show5M: true,
                show15M: true,
                show30M: true,
                show1H: true,
                show2H: true,
                show4H: true,
                show1D: true,
            });

        this.chart = new Chart(tradingViewApi)
            .setMarket(market)
            .setIndicators([this.mtfEmaIndicator])
            .setOnMessage(this.handleResponse);
    }

    run(): void {
        this.chart.connect();
    }

    private handleResponse = (data: MtfEmaIndicatorValues) => {
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
                this.telegramNotification.notify(this.buildCrossingMessage(timeframe1!, timeframe2!));
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
