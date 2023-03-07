import { WebSocket } from 'ws';
import { ChartMessageSender } from '../senders/chart-message-sender.js';
import { RawMessagesPacket } from '../packets/raw-messages-packet.js';
import { PongPacket } from '../packets/pong-packet.js';
import { MessagesPacket } from '../packets/messages-packet.js';
import { AuthMessageSender } from '../senders/auth-message-sender.js';
import { LocaleMessageSender } from '../senders/locale-message-sender.js';
import { QuoteMessageSender } from '../senders/quote-message-sender.js';
import { SeriesMessageSender } from '../senders/series-message-sender.js';
import { StudyMessageSender } from '../senders/study-message-sender.js';
import { SymbolMessageSender } from '../senders/symbol-message-sender.js';
import { TimezoneMessageSender } from '../senders/timezone-message-sender.js';
import { Sender } from '../../interfaces/sender.interface.js';
import { Indicator } from '../../interfaces/indicator.interface.js';

type MessageWebSocketHandler = (data: any) => void;

export class TradingViewApi {
    private ws: WebSocket;
    private connected: boolean;

    private _onMessage: MessageWebSocketHandler = () => {};

    private readonly senders: Sender[];

    constructor() {
        this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket', {
            origin: 'https://s.tradingview.com',
        });
        this.connected = false;
        this.senders = [];
    }

    onMessage(handler: MessageWebSocketHandler): this {
        this._onMessage = handler;
        return this;
    }

    connect(): void {
        if (!this.connected) {
            this.ws.on('open', () => {
                for (const sender of this.senders) {
                    sender.send();
                }
            });

            this.ws.on('message', data => {
                const rawMessagesPacket = new RawMessagesPacket(data);

                if (rawMessagesPacket.isPing()) {
                    const pongPacket = new PongPacket(rawMessagesPacket);
                    this.ws.send(pongPacket.data);
                    return;
                }

                const messagesPacket = new MessagesPacket(rawMessagesPacket);

                if (messagesPacket.hasInitialMessage) {
                    return;
                }

                messagesPacket.data.forEach(message => this._onMessage(message.data));
            });
        }
        this.connected = true;
    }

    disconnect(): void {
        this.ws.close();
    }

    setAuthToken(token: string): void {
        this.senders.push(new AuthMessageSender(this.ws).setToken(token));
    }

    setLocale(locale: string): void {
        const [code, id] = locale.split('-');
        if (code && id) {
            this.senders.push(new LocaleMessageSender(this.ws).set([code, id]));
        }
    }

    switchTimezone(sessionId: string, timezone: string): void {
        this.senders.push(new TimezoneMessageSender(this.ws).switch(sessionId, timezone));
    }

    chartCreateSession(sessionId: string): void {
        this.senders.push(new ChartMessageSender(this.ws).createSession(sessionId));
    }

    quoteCreateSession(sessionId: string): void {
        this.senders.push(new QuoteMessageSender(this.ws).createSession(sessionId));
    }

    quoteSetFields(fields: string[]): void {
        this.senders.push(new QuoteMessageSender(this.ws).setFields(fields));
    }

    quoteFastSymbols(): void {
        this.senders.push(new QuoteMessageSender(this.ws).fastSymbols());
    }

    quoteAddSymbols(symbols: string[]): void {
        this.senders.push(new QuoteMessageSender(this.ws).addSymbols(symbols));
    }

    quoteRemoveSymbols(symbols: string[]): void {
        this.senders.push(new QuoteMessageSender(this.ws).removeSymbols(symbols));
    }

    createSeries(sessionId: string, seriesId: string, timeframe: string, range: number,): void {
        this.senders.push(new SeriesMessageSender(this.ws).create(sessionId, seriesId, timeframe, range));
    }

    createStudy(sessionId: string, indicator: Indicator): void {
        const indicatorId = indicator.id;
        const indicatorName = indicator.name;
        const indicatorParams = indicator.buildRequestParams();
        this.senders.push(new StudyMessageSender(this.ws).create(sessionId, indicatorName, indicatorId, indicatorParams));
    }

    resolveSymbol(symbol: string, sessionId: string, seriesId: string,): void {
        this.senders.push(new SymbolMessageSender(this.ws).resolve(symbol, sessionId, seriesId));
    }
}
