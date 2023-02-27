import { RawData, WebSocket } from 'ws';

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

    connect(): this {
        this.ws.on('open', this._onConnect);
        this.ws.on('close', this._onDisconnect);
        this.ws.on('message', this._onMessage);
        return this;
    }

    disconnect(): this {
        this.ws.close();
        return this;
    }
}
