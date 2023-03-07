import { TradingViewApi } from './classes/api/trading-view.api.js';
import { MtfEmaCrossingRobot } from './classes/robots/mtf-ema-crossing-robot.js';
import { Market } from './classes/markets/market.js';
import { binanceFuturesSymbols } from './entities/markets/binance/binance-futures.js';

const twa = new TradingViewApi();

for (const symbol of binanceFuturesSymbols) {
    const robot = new MtfEmaCrossingRobot(twa, new Market(symbol));
    robot.run();
}
