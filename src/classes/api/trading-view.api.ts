import { RawData, WebSocket } from 'ws';
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

type OpenWebSocketHandler = () => void;
type CloseWebSocketHandler = () => void;
type MessageWebSocketHandler = (data: RawData) => void;

export class TradingViewApi {
    private ws: WebSocket;

    private _onConnect: OpenWebSocketHandler = () => {};
    private _onDisconnect: CloseWebSocketHandler = () => {};
    private _onMessage: MessageWebSocketHandler = () => {};

    constructor() {
        this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket', {
            origin: 'https://s.tradingview.com',
        });
    }

    onConnect(handler: OpenWebSocketHandler): this {
        this._onConnect = handler;
        return this;
    }

    onDisconnect(handler: CloseWebSocketHandler): this {
        this._onDisconnect = handler;
        return this;
    }

    onMessage(handler: MessageWebSocketHandler): this {
        this._onMessage = handler;
        return this;
    }

    connect(): void {
        this.ws.on('open', this._onConnect);
        this.ws.on('close', this._onDisconnect);
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

    disconnect(): void {
        this.ws.close();
    }

    setAuthToken(token: string): void {
        new AuthMessageSender(this.ws)
            .setToken(token)
            .send();
    }

    setLocale(locale: string): void {
        const [code, id] = locale.split('-');
        if (code && id) {
            new LocaleMessageSender(this.ws)
                .set([code, id])
                .send();
        }
    }

    switchTimezone(sessionId: string, timezone: string): void {
        new TimezoneMessageSender(this.ws)
            .switch(sessionId, timezone)
            .send();
    }

    chartCreateSession(sessionId: string): void {
        new ChartMessageSender(this.ws)
            .createSession(sessionId)
            .send();
    }

    quoteCreateSession(sessionId: string): void {
        new QuoteMessageSender(this.ws)
            .createSession(sessionId)
            .send();
    }

    quoteSetFields(fields: string[]): void {
        new QuoteMessageSender(this.ws)
            .setFields(fields)
            .send();
    }

    quoteFastSymbols(): void {
        new QuoteMessageSender(this.ws)
            .fastSymbols()
            .send();
    }

    quoteAddSymbols(symbols: string[]): void {
        new QuoteMessageSender(this.ws)
            .addSymbols(symbols)
            .send();
    }

    quoteRemoveSymbols(symbols: string[]): void {
        new QuoteMessageSender(this.ws)
            .removeSymbols(symbols)
            .send();
    }

    createSeries(
        sessionId: string,
        seriesId: string,
        timeframe: string,
        range: number,
    ): void {
        new SeriesMessageSender(this.ws)
            .create(sessionId, seriesId, timeframe, range)
            .send();
    }

    createStudy(
        sessionId: string,
        studyId: string,
        indicatorId: string,
        indicatorParams = {},
    ): void {
        new StudyMessageSender(this.ws)
            .create(sessionId, studyId, indicatorId, indicatorParams)
            .send();
    }

    resolveSymbol(
        symbol: string,
        sessionId: string,
        seriesId: string,
    ): void {
        new SymbolMessageSender(this.ws)
            .resolve(symbol, sessionId, seriesId)
            .send();
    }
}
