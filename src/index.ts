import { TradingViewApi } from './classes/api/trading-view.api.js';
import { Chart } from './classes/chart/chart.js';
import { Market } from './classes/markets/market.js';
import { TradingViewConnection } from './classes/connections/trading-view-connection.js';
import { moexSymbols } from './entities/markets/moex/moex.js';
import { TRADING_VIEW_AUTH_TOKEN } from './constants.js';
import { SmartMoneyRobot } from './classes/robots/smart-money-robot.js';
import { SmartMoneyConceptsIndicator } from './classes/indicators/custom-indicators/smart-money-concepts-indicator.js';

const twa = new TradingViewApi(TRADING_VIEW_AUTH_TOKEN);
const twConnection = new TradingViewConnection(twa);

const charts = moexSymbols.map(symbol => {
    const market = new Market(symbol);

    return new Chart(twa)
        .setMarket(market)
        .setIndicators([
            new SmartMoneyConceptsIndicator(`SM_30M${symbol}`, { timeframe: '30' }),
            new SmartMoneyConceptsIndicator(`SM_15M${symbol}`, { timeframe: '15' }),
            new SmartMoneyConceptsIndicator(`SM_5M${symbol}`, { timeframe: '5' }),
        ])
        .setRobots([new SmartMoneyRobot(market)]);
});

twConnection
    .setCharts(charts)
    .start();
