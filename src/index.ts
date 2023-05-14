import { TradingViewApi } from './classes/api/trading-view.api.js';
import { Chart } from './classes/chart/chart.js';
import { Market } from './classes/markets/market.js';
import { MtfEmaIndicator } from './classes/indicators/custom-indicators/mtf-ema-indicator.js';
import { MtfEmaCrossingRobot } from './classes/robots/mtf-ema-crossing-robot.js';
import { TradingViewConnection } from './classes/connections/trading-view-connection.js';
import { moexSymbols } from './entities/markets/moex/moex.js';
import { TRADING_VIEW_AUTH_TOKEN } from './constants.js';
import { SonarlabOrderBlockIndicator } from './classes/indicators/custom-indicators/sonarlab-order-block-indicator.js';

const twa = new TradingViewApi();
const twConnection = new TradingViewConnection(twa);

const charts = moexSymbols.map(symbol => {
    const market = new Market(symbol);
    const mtfEmaIndicator = new MtfEmaIndicator(
        `MTFEMA_163_${symbol}`,
        {
            length: 163,
            show5M: true,
            show15M: true,
            show30M: true,
            show1H: true,
            show2H: true,
            show4H: true,
            show1D: true,
        })
        .setFractionPartLength(2);

    const orderBlockIndicator = new SonarlabOrderBlockIndicator(`OB_${symbol}`, { timeframe: '1D' });

    const mtfEmaCrossingRobot = new MtfEmaCrossingRobot(market);

    return new Chart()
        .setMarket(market)
        .setIndicators([mtfEmaIndicator, orderBlockIndicator])
        .setRobots([mtfEmaCrossingRobot]);
});

twa.setAuthToken(TRADING_VIEW_AUTH_TOKEN);
twConnection.setCharts(charts);
twConnection.initializeChartsIndicators();

twConnection.start();
