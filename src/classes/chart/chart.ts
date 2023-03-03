import { Market } from '../markets/market.js';
import { Indicator } from '../../interfaces/indicator.interface.js';
import { TradingViewApi } from '../api/trading-view.api.js';

type MessageHandler = (data: any) => void;

export class Chart {
    private sessionId: string | undefined;
    private seriesId: string | undefined;

    private market: Market | undefined;
    private indicators: Indicator[];

    private onMessage: MessageHandler = () => {};

    constructor(private tradingViewApi: TradingViewApi) {
        this.indicators = [];
    }

    setOnMessage(handler: MessageHandler): this {
        this.onMessage = handler;
        return this;
    }

    setMarket(market: Market): this {
        this.market = market;
        this.sessionId = this.market.genSessionID();
        this.seriesId = this.market.genSeriesID();
        return this;
    }

    setIndicators(indicators: Indicator[]): this {
        this.indicators = indicators;
        return this;
    }

    connect(): void {
        this.canConnect();
        this.tradingViewApi.onMessage(data => {
            if (data[0] === this.sessionId) {
                for (const indicator of this.indicators) {
                    if (data[1][indicator.name]) {
                        this.onMessage(indicator.normalizeRawData(data[1][indicator.name]));
                    }
                }
            }
        });

        this.tradingViewApi.connect();

        const { sessionId, seriesId, market } = this;

        this.tradingViewApi.chartCreateSession(sessionId!);
        this.tradingViewApi.resolveSymbol(market!.symbol, sessionId!, seriesId!);

        for (const indicator of this.indicators!) {
            this.tradingViewApi.createSeries(sessionId!, seriesId!, '1', 100);
            this.tradingViewApi.createStudy(sessionId!, indicator);
        }
    }

    private canConnect(): void {
        if (!this.sessionId) {
            throw new Error(`Please set market before subscribe`);
        }
    }
}
