import { Market } from '../markets/market.js';
import { Indicator } from '../../interfaces/indicator.interface.js';
import { TradingViewApi } from '../api/trading-view.api.js';
// import { Robot } from '../../interfaces/robot.interface.js';

type MessageHandler = (data: any) => void;

export class Chart {
    private market: Market | undefined;
    private indicators: Indicator[];
    // private robots: Robot[];

    private onMessage: MessageHandler = () => {};

    constructor(private tradingViewApi: TradingViewApi) {
        this.indicators = [];
        // this.robots = [];
    }

    setOnMessage(handler: MessageHandler): this {
        this.onMessage = handler;
        return this;
    }

    setMarket(market: Market): this {
        this.market = market;
        return this;
    }

    setIndicators(indicators: Indicator[]): this {
        this.indicators = indicators;
        return this;
    }

    // setRobots(robots: Robot[]): this {
    //     this.robots = robots;
    //     return this;
    // }

    connect(): void {
        this.tradingViewApi.onMessage(data => {
            if (data) {
                for (const indicator of this.indicators) {
                    if (data[0] === indicator.sessionId && data[1][indicator.name]) {
                        this.onMessage(indicator.normalizeRawData(data[1][indicator.name]));
                    }
                }
            }
        });

        this.tradingViewApi.connect();

        const { market } = this;

        for (const indicator of this.indicators!) {
            const { sessionId, seriesId } = indicator;
            this.tradingViewApi.chartCreateSession(sessionId!);
            this.tradingViewApi.resolveSymbol(market!.symbol, sessionId!, seriesId!);
            this.tradingViewApi.createSeries(sessionId!, seriesId!, '1', 100);
            this.tradingViewApi.createStudy(sessionId!, indicator);
        }
    }
}
