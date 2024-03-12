import { TradingViewApi } from '../api/trading-view.api.js';
import { Chart } from '../chart/chart.js';

export class TradingViewConnection {

    private charts: Chart[];

    constructor(private twa: TradingViewApi) {
        this.charts = [];
    }

    setCharts(charts: Chart[]): this {
        this.charts = charts;
        return this;
    }

    start(): void {
        this.twa.onMessage(this.onMessage);
        this.twa.connect();
    }

    private onMessage = (data: any) => {
        this.charts?.forEach(chart => chart.onMessage(data));
    };
}
