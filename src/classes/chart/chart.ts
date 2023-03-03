import { Market } from '../markets/market.js';
import { Indicator } from '../../interfaces/indicator.interface.js';
import { TradingViewApi } from '../api/trading-view.api.js';

export class Chart {
    private sessionId: string | undefined;
    // @ts-ignore
    private seriesId: string | undefined;

    private _market: Market | undefined;
    // @ts-ignore
    private _indicators: Indicator[] | undefined;

    constructor(private tradingViewApi: TradingViewApi) {}

    setMarket(market: Market): this {
        this._market = market;
        this.sessionId = this._market.genSessionID();
        this.seriesId = this._market.genSeriesID();
        return this;
    }

    setIndicators(indicators: Indicator[]): this {
        this._indicators = indicators;
        return this;
    }

    subscribe(cb: (data: unknown) => void): void {
        this.canSubscribe();

        this.tradingViewApi.onConnect(() => {
            this.tradingViewApi.chartCreateSession(this.sessionId!);
        });

        this.tradingViewApi.onMessage(data => {
            cb(data);
        });
    }

    unsubscribe(): void {
        this.tradingViewApi.disconnect();
    }

    private canSubscribe(): void {
        if (!this.sessionId) {
            throw new Error(`Please set market before subscribe`);
        }
    }
}
