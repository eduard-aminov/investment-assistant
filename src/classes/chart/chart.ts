import { Indicator } from '../../interfaces/indicator.interface.js';
import { Market } from '../markets/market.js';
import { Robot } from '../../interfaces/robot.interface.js';
import { TradingViewApi } from '../api/trading-view.api.js';

export class Chart {
    private tradingViewApi: TradingViewApi | null;
    private market: Market | null;
    private indicators: Indicator[];
    private robots: Robot[];

    constructor(twa: TradingViewApi) {
        this.tradingViewApi = twa;
        this.market = null;
        this.indicators = [];
        this.robots = [];
    }

    onMessage = (data: any): void => {
        if (data && data[1]) {
            for (const indicator of this.indicators) {
                if (data[1][indicator.name]) {
                    this.robots.forEach(robot => robot.onMessage(indicator.normalizeRawData(data[1][indicator.name])));
                }
            }
        }
    };

    setMarket(market: Market): this {
        this.market = market;
        return this;
    }

    setIndicators(indicators: Indicator[]): this {
        if (this.tradingViewApi) {
            this.indicators = indicators;
            for (const indicator of this.indicators!) {
                const sessionId = `${indicator.name}${Math.random()}`;
                const seriesId = `${indicator.name}${Math.random()}`;
                const timeframe = indicator.timeframe ?? '1';

                this.tradingViewApi.chartCreateSession(sessionId!);
                this.tradingViewApi.resolveSymbol(this.market!.symbol, sessionId!, seriesId!);
                this.tradingViewApi.createSeries(sessionId!, seriesId!, timeframe, 100);
                this.tradingViewApi.createStudy(sessionId!, indicator);
            }
        }
        return this;
    }

    setRobots(robots: Robot[]): this {
        this.robots = robots;
        return this;
    }
}

