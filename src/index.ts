import WebSocket from 'ws';
import { AuthMessageSender } from './classes/senders/auth-message-sender.js';
import { ChartMessageSender } from './classes/senders/chart-message-sender.js';
import { SymbolMessageSender } from './classes/senders/symbol-message-sender.js';
import { SeriesMessageSender } from './classes/senders/series-message-sender.js';
import { StudyMessageSender } from './classes/senders/study-message-sender.js';
import { DuRawMessageData } from './types/raw-message.type.js';
import fetch from 'node-fetch';
import { RawMessagesPacket } from './classes/packets/raw-messages-packet.js';
import { PongPacket } from './classes/packets/pong-packet.js';
import { MessagesPacket } from './classes/packets/messages-packet.js';
import { TELEGRAM_BOT_API_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID, TRADING_VIEW_AUTH_TOKEN } from './constants.js';

const ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket', {
    origin: 'https://s.tradingview.com',
});

// class MarketConnector {
//     private ws: WebSocket;
//     private symbol: string | undefined;
//     private duMessageHandler: (data: DuRawMessageData) => void;
//
//     constructor() {
//         this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket', {
//             origin: 'https://s.tradingview.com',
//         });
//
//         this.duMessageHandler = () => {};
//     }
//
//     setSymbol(symbol: string): this {
//         this.symbol = symbol;
//         return this;
//     }
//
//     setDuMessageHandler(handler: (data: DuRawMessageData) => void): this {
//         this.duMessageHandler = handler;
//         return this;
//     }
//
//     connect(): void {
//         this.canConnect();
//
//         this.ws.on('open', () => {
//             new AuthMessageSender(this.ws)
//                 .setToken(TRADING_VIEW_AUTH_TOKEN)
//                 .send();
//
//             const chartSessionId = `MTF_EMA_${this.symbol}`;
//             const chartSeriesId = `MTF_EMA_${this.symbol}_$`;
//
//             new ChartMessageSender(this.ws)
//                 .createSession(chartSessionId)
//                 .send();
//
//             new SymbolMessageSender(this.ws)
//                 .resolve(this.symbol!, chartSessionId, chartSeriesId)
//                 .send();
//
//             new SeriesMessageSender(this.ws)
//                 .create(chartSessionId, chartSeriesId, '1', 100)
//                 .send();
//
//             new StudyMessageSender(this.ws)
//                 .create(chartSessionId, 'MTF_EMA', 'Script@tv-scripting-101!', {
//                     'text': '0DdSUE8wRzucFjlqHB91ag==_kyPbu4glBrkcG0brD4FhCw9577CTnQBq6OFqKimD/nRUEp68X5RDyO3r/SvZ4VtLyqMYsAGMrLEM42I/ZahhslmF3H0oI8txp4Czd/AKwxu1Ck+ssZnWbqN0V5CMsYek+zYNquC4dc7um4h/EpxRVkVMrJMxvxJS3yUuFYPLhRaIVGhjShxinlYtiRxIrGFlPDey7ML5xj0RHTZe4RgOIwLC562AhxrmL60xy+K6hc+I0pPyoNPh6+qbVyzV9HZH/ZggUQLl9q0SYkMqBxu64rFsGU571PNnHKkaX0hvOGam1OyPrj0EhJMdQkwBpLvgQGk89mF1ZnkxdKehSfTfhc1nO7DECW5wx2apsLc1/Ccj6jP/Y5xWi83o6Ex/OB37mcrItv8P6Q+2me97dw4KFf5RQl5i8HavBWAh2bP+UMwQheoOMyJSZHdvVxYxe3LyrueAsxCROhmIBbJ1D+QHEPCL+e2+PVj1Nc9iBwn2zwDSYPTFkDoWla3fknCecrc/ZIGenI2vQT/coJZJC5loA5ziAMmm38btwzd7Whox9m5C+QHk4TIfIJ7FGVAxs1BL9O2MZujNM1K6ic/TloPQcKMUU9pitUpctJ07vrZ12AMLSAVlFjUw+wH/+J3ABwTsOhEvRCnrAoM0dhu8IEOurBP20DbjP6m2NpIjagL4ejt3l7qP22+Tn11V7eaHmF2u6RTNrKjeG0bJXlLRWlLtnFANqd3E1XxdkLOR8egUTaKAggUSqHZ8G2prfIDzVu7Q6j7DEIqczdFK2uNSfQoUCYqZK6pJYeDiE9yGyeHZ0K0IdG2PWB+2sn1SIuh8Lfa7FZjqjRBoMEBP2GAwMoG6tOBmfWSonXJrOmr5yYXlWw96UontIbY6xty6B4cJ0bDlQdGUy2vocxZcqAkXEezPVko7cAhKaNxeJkp0oiAEtxz+I1UgkWwnzetKQMhFnsDpELAnpYZLc55R6QEMoz9c1Lrli4WbaZGN4thBlgnmrhLaR8ftieieBuLJC/as+1qn3n+31ZNlpWFz5aI81ibGQ5T/asu4x6hck4X7cuO2OO3if8/NdLy3XXD2m74m057hZzM3CuVJJqpsyo7oOHB6uEf1Vajk2PGS2YEBG7H0pxRi/FbYdbjakDmVWNHjvoXOPaGtQcsFLoLU4ksL7y3YddanWj4CiqqMLsSTuCoL4GSOW39YAILk/rUSW1zt5Gg5hZ4pVzIIFejPIhr2HZLfA15lto8oUufGgkBXMqBqHR+ydWt6fyL07/wwpWJ28npB65WHB4KwtCo4NZncuw0mWq7gBpmQmvFBXUlmVK+ZwLvJu6aZG9PGb3Th37DkDYbza3B0jN16NvpoYh/c8AzrWjJoOMPdNR0bvSQVzvLxhpbFzxLLBnAi9m2Kds7gbRzZJ1mczkiS4vND2At+LPoauvpI0fRqxytQYIuY2ZJJbL7r07zphlT6jW3tTd0CSxImjDOEhaaxAvqzAk+U0whhlMYvv20P51HMzmKa2cdK93AO6TKm6STlxavS0CvTlONRhCVAV2OfU4XvmGFnKGLYm1SI8ozQNDIPcChGUj/OOCDveNbj1ul2VyjLefmRZhz7UOTdOZJlO+V9BnP/UcZtMMa8bMXZZFXhK3YPBnTGvp2uj7xdFPCfUaxUn24TxgwSnkmRqvMJ5loWLfALS3YLruU8HFz2IRUuTYYNVcaG4uK0pVK+EzPQpoN09kwnqlng8Ktv9TXvhyV9MYdmmwyyvAUv5dJc+KxpNSHqDEXfxUL3MByggGWjuiDtbEHMZupRcRPS6x4YelcsoJRXfRv6g6uKrGCJUJpcTENb81ntsMho/lLxXXc9SEujyBi2hMmUA/JQMQXjqxtfD4b+3XTQbQuJl8Rd6Q==',
//                     'pineId': 'PUB;1085',
//                     'pineVersion': '-1.0',
//                     'in_0': {
//                         'v': 163,
//                         'f': true,
//                         't': 'integer'
//                     },
//                     'in_1': {
//                         'v': 'close',
//                         'f': true,
//                         't': 'source'
//                     },
//                     'in_2': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_3': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_4': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_5': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_6': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_7': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     },
//                     'in_8': {
//                         'v': true,
//                         'f': true,
//                         't': 'bool'
//                     }
//                 })
//                 .send();
//         });
//
//         this.ws.on('message', data => {
//             const rawMessagesPacket = new RawMessagesPacket(data);
//
//             if (rawMessagesPacket.isPing()) {
//                 const pongPacket = new PongPacket(rawMessagesPacket);
//                 this.ws.send(pongPacket.data);
//                 return;
//             }
//
//             const messagesPacket = new MessagesPacket(rawMessagesPacket);
//
//             if (messagesPacket.hasInitialMessage) {
//                 return;
//             }
//
//             messagesPacket.handleMessages({
//                 du: this.duMessageHandler,
//             });
//         });
//     }
//
//     private canConnect(): void {
//         if (!this.symbol) {
//             throw new Error(`Please set symbol before connect`);
//         }
//     }
// }

const moexSymbols = [
    'MOEX:SBER',
    'MOEX:AFKS',
    'MOEX:AFLT',
    'MOEX:AGRO',
    'MOEX:ALRS',
    'MOEX:BANE',
    'MOEX:CBOM',
    'MOEX:CHMF',
    'MOEX:CIAN',
    'MOEX:DSKY',
    'MOEX:ENRU',
    'MOEX:ETLN',
    'MOEX:FEES',
    'MOEX:FIVE',
    'MOEX:GAZP',
    'MOEX:GEMC',
    'MOEX:GMKN',
    'MOEX:IRAO',
    'MOEX:LKOH',
    'MOEX:LSRG',
    'MOEX:MAGN',
    'MOEX:MDMG',
    'MOEX:MGNT',
    'MOEX:MOEX',
    'MOEX:MTLR',
    'MOEX:MTSS',
    'MOEX:MVID',
    'MOEX:NLMK',
    'MOEX:NVTK',
    'MOEX:OGKB',
    'MOEX:OZON',
    'MOEX:PHOR',
    'MOEX:PIKK',
    'MOEX:PLZL',
    'MOEX:POLY',
    'MOEX:RASP',
    'MOEX:ROSN',
    'MOEX:RTKM',
    'MOEX:RUAL',
    'MOEX:SFTL',
    'MOEX:SIBN',
    'MOEX:SNGS',
    'MOEX:TATN',
    'MOEX:TGKA',
    'MOEX:UPRO',
    'MOEX:VKCO',
    'MOEX:VTBR',
    'MOEX:YNDX',
];

// const binanceSymbols = [
//     'BINANCE:BTCUSDTPERP',
//     'BINANCE:ETHUSDTPERP',
//     'BINANCE:ETCUSDTPERP',
//     'BINANCE:RVNUSDTPERP',
//     'BINANCE:YFIUSDTPERP',
//     'BINANCE:MKRUSDTPERP',
//     'BINANCE:DEFIUSDTPERP',
//     'BINANCE:XMRUSDTPERP',
//     'BINANCE:BCHUSDTPERP',
//     'BINANCE:LTCUSDTPERP',
//     'BINANCE:AAVEUSDTPERP',
//     'BINANCE:DASHUSDTPERP',
//     'BINANCE:COMPUSDTPERP',
//     'BINANCE:EGLDUSDTPERP',
//     'BINANCE:ZECUSDTPERP',
//     'BINANCE:KSMUSDTPERP',
//     'BINANCE:SOLUSDTPERP',
//     'BINANCE:ENSUSDTPERP',
//     'BINANCE:ATOMUSDTPERP',
//     'BINANCE:ZENUSDTPERP',
//     'BINANCE:NEOUSDTPERP',
//     'BINANCE:ARUSDTPERP',
// ];

const symbols = [
    ...moexSymbols,
    // ...binanceSymbols,
];

const prevValuesStorage = symbols.reduce<Record<string, number[] | null>>((acc, cur) => {
    acc[cur] = null;
    return acc;
}, {});

let prevNotifyMessage = '';
const notify = (message: string) => {
    if (message !== prevNotifyMessage) {
        fetch(`${TELEGRAM_BOT_API_URL + TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'post',
            body: JSON.stringify({ chat_id: TELEGRAM_USER_ID, text: message }),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            prevNotifyMessage = message;
        });
    }
};

const duMessageHandler = (data: DuRawMessageData): void => {
    if (data[1]['MTF_EMA']) {
        const rawValues = data[1]['MTF_EMA']!.st.at(-1)!.v;
        const curValues = [
            rawValues[1],
            rawValues[2],
            rawValues[4],
            rawValues[6],
            rawValues[8],
            rawValues[10],
            rawValues[12],
            rawValues[14],
        ].map(item => Number(item!.toFixed(2)));

        const prevValues = prevValuesStorage[data[0]];

        if (prevValues && (prevValues[0]! <= prevValues[1]!) && (curValues[0]! > curValues[1]!)) {
            notify(`${data[0]}: Пересечение 1m 5m снизу вверх`);
        }

        if (prevValues && (prevValues[0]! >= prevValues[1]!) && (curValues[0]! < curValues[1]!)) {
            notify(`${data[0]}: Пересечение 1m 5m сверху вниз`);
        }

        if (prevValues && (prevValues[1]! <= prevValues[2]!) && (curValues[1]! > curValues[2]!)) {
            notify(`${data[0]}: Пересечение 5m 15m снизу вверх`);
        }

        if (prevValues && (prevValues[1]! >= prevValues[2]!) && (curValues[1]! < curValues[2]!)) {
            notify(`${data[0]}: Пересечение 5m 15m сверху вниз`);
        }

        if (prevValues && (prevValues[2]! <= prevValues[3]!) && (curValues[2]! > curValues[3]!)) {
            notify(`${data[0]}: Пересечение 15m 30m снизу вверх`);
        }

        if (prevValues && (prevValues[2]! >= prevValues[3]!) && (curValues[2]! < curValues[3]!)) {
            notify(`${data[0]}: Пересечение 15m 30m сверху вниз`);
        }

        if (prevValues && (prevValues[3]! <= prevValues[4]!) && (curValues[3]! > curValues[4]!)) {
            notify(`${data[0]}: Пересечение 30m 1h снизу вверх`);
        }

        if (prevValues && (prevValues[3]! >= prevValues[4]!) && (curValues[3]! < curValues[4]!)) {
            notify(`${data[0]}: Пересечение 30m 1h сверху вниз`);
        }

        if (prevValues && (prevValues[4]! <= prevValues[5]!) && (curValues[4]! > curValues[5]!)) {
            notify(`${data[0]}: Пересечение 1h 2h снизу вверх`);
        }

        if (prevValues && (prevValues[4]! >= prevValues[5]!) && (curValues[4]! < curValues[5]!)) {
            notify(`${data[0]}: Пересечение 1h 2h сверху вниз`);
        }

        if (prevValues && (prevValues[5]! <= prevValues[6]!) && (curValues[5]! > curValues[6]!)) {
            notify(`${data[0]}: Пересечение 2h 4h снизу вверх`);
        }

        if (prevValues && (prevValues[5]! >= prevValues[6]!) && (curValues[5]! < curValues[6]!)) {
            notify(`${data[0]}: Пересечение 2h 4h сверху вниз`);
        }

        if (prevValues && (prevValues[6]! <= prevValues[7]!) && (curValues[6]! > curValues[7]!)) {
            notify(`${data[0]}: Пересечение 4h 1d снизу вверх`);
        }

        if (prevValues && (prevValues[6]! >= prevValues[7]!) && (curValues[6]! < curValues[7]!)) {
            notify(`${data[0]}: Пересечение 4h 1d сверху вниз`);
        }

        prevValuesStorage[data[0]] = curValues;
    }
};

ws.on('open', () => {
    symbols.forEach(symbol => {
        new AuthMessageSender(ws)
            .setToken(TRADING_VIEW_AUTH_TOKEN)
            .send();

        const chartSessionId = `MTF_EMA_${symbol}`;
        const chartSeriesId = `MTF_EMA_${symbol}_$`;

        new ChartMessageSender(ws)
            .createSession(chartSessionId)
            .send();

        new SymbolMessageSender(ws)
            .resolve(symbol!, chartSessionId, chartSeriesId)
            .send();

        new SeriesMessageSender(ws)
            .create(chartSessionId, chartSeriesId, '1', 100)
            .send();

        new StudyMessageSender(ws)
            .create(chartSessionId, 'MTF_EMA', 'Script@tv-scripting-101!', {
                'text': '0DdSUE8wRzucFjlqHB91ag==_kyPbu4glBrkcG0brD4FhCw9577CTnQBq6OFqKimD/nRUEp68X5RDyO3r/SvZ4VtLyqMYsAGMrLEM42I/ZahhslmF3H0oI8txp4Czd/AKwxu1Ck+ssZnWbqN0V5CMsYek+zYNquC4dc7um4h/EpxRVkVMrJMxvxJS3yUuFYPLhRaIVGhjShxinlYtiRxIrGFlPDey7ML5xj0RHTZe4RgOIwLC562AhxrmL60xy+K6hc+I0pPyoNPh6+qbVyzV9HZH/ZggUQLl9q0SYkMqBxu64rFsGU571PNnHKkaX0hvOGam1OyPrj0EhJMdQkwBpLvgQGk89mF1ZnkxdKehSfTfhc1nO7DECW5wx2apsLc1/Ccj6jP/Y5xWi83o6Ex/OB37mcrItv8P6Q+2me97dw4KFf5RQl5i8HavBWAh2bP+UMwQheoOMyJSZHdvVxYxe3LyrueAsxCROhmIBbJ1D+QHEPCL+e2+PVj1Nc9iBwn2zwDSYPTFkDoWla3fknCecrc/ZIGenI2vQT/coJZJC5loA5ziAMmm38btwzd7Whox9m5C+QHk4TIfIJ7FGVAxs1BL9O2MZujNM1K6ic/TloPQcKMUU9pitUpctJ07vrZ12AMLSAVlFjUw+wH/+J3ABwTsOhEvRCnrAoM0dhu8IEOurBP20DbjP6m2NpIjagL4ejt3l7qP22+Tn11V7eaHmF2u6RTNrKjeG0bJXlLRWlLtnFANqd3E1XxdkLOR8egUTaKAggUSqHZ8G2prfIDzVu7Q6j7DEIqczdFK2uNSfQoUCYqZK6pJYeDiE9yGyeHZ0K0IdG2PWB+2sn1SIuh8Lfa7FZjqjRBoMEBP2GAwMoG6tOBmfWSonXJrOmr5yYXlWw96UontIbY6xty6B4cJ0bDlQdGUy2vocxZcqAkXEezPVko7cAhKaNxeJkp0oiAEtxz+I1UgkWwnzetKQMhFnsDpELAnpYZLc55R6QEMoz9c1Lrli4WbaZGN4thBlgnmrhLaR8ftieieBuLJC/as+1qn3n+31ZNlpWFz5aI81ibGQ5T/asu4x6hck4X7cuO2OO3if8/NdLy3XXD2m74m057hZzM3CuVJJqpsyo7oOHB6uEf1Vajk2PGS2YEBG7H0pxRi/FbYdbjakDmVWNHjvoXOPaGtQcsFLoLU4ksL7y3YddanWj4CiqqMLsSTuCoL4GSOW39YAILk/rUSW1zt5Gg5hZ4pVzIIFejPIhr2HZLfA15lto8oUufGgkBXMqBqHR+ydWt6fyL07/wwpWJ28npB65WHB4KwtCo4NZncuw0mWq7gBpmQmvFBXUlmVK+ZwLvJu6aZG9PGb3Th37DkDYbza3B0jN16NvpoYh/c8AzrWjJoOMPdNR0bvSQVzvLxhpbFzxLLBnAi9m2Kds7gbRzZJ1mczkiS4vND2At+LPoauvpI0fRqxytQYIuY2ZJJbL7r07zphlT6jW3tTd0CSxImjDOEhaaxAvqzAk+U0whhlMYvv20P51HMzmKa2cdK93AO6TKm6STlxavS0CvTlONRhCVAV2OfU4XvmGFnKGLYm1SI8ozQNDIPcChGUj/OOCDveNbj1ul2VyjLefmRZhz7UOTdOZJlO+V9BnP/UcZtMMa8bMXZZFXhK3YPBnTGvp2uj7xdFPCfUaxUn24TxgwSnkmRqvMJ5loWLfALS3YLruU8HFz2IRUuTYYNVcaG4uK0pVK+EzPQpoN09kwnqlng8Ktv9TXvhyV9MYdmmwyyvAUv5dJc+KxpNSHqDEXfxUL3MByggGWjuiDtbEHMZupRcRPS6x4YelcsoJRXfRv6g6uKrGCJUJpcTENb81ntsMho/lLxXXc9SEujyBi2hMmUA/JQMQXjqxtfD4b+3XTQbQuJl8Rd6Q==',
                'pineId': 'PUB;1085',
                'pineVersion': '-1.0',
                'in_0': {
                    'v': 163,
                    'f': true,
                    't': 'integer'
                },
                'in_1': {
                    'v': 'close',
                    'f': true,
                    't': 'source'
                },
                'in_2': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_3': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_4': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_5': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_6': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_7': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                },
                'in_8': {
                    'v': true,
                    'f': true,
                    't': 'bool'
                }
            })
            .send();
    });
});

ws.on('message', data => {
    const rawMessagesPacket = new RawMessagesPacket(data);

    if (rawMessagesPacket.isPing()) {
        const pongPacket = new PongPacket(rawMessagesPacket);
        ws.send(pongPacket.data);
        return;
    }

    const messagesPacket = new MessagesPacket(rawMessagesPacket);

    if (messagesPacket.hasInitialMessage) {
        return;
    }

    messagesPacket.handleMessages({
        du: duMessageHandler,
    });
});
// symbols.forEach(symbol => {
//     new MarketConnector()
//         .setSymbol(symbol)
//         .setDuMessageHandler(duMessageHandler)
//         .connect();
// });
