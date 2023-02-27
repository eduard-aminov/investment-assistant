import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { ResolveSymbolSendPacket } from '../packets/send-packets/symbol/resolve-symbol-send-packet.js';

export class SymbolMessageSender implements Sender {
    private messagesQueue: Packet[] = [];

    constructor(private ws: WebSocket) {}

    resolve(
        symbol: string,
        sessionId: string,
        seriesId: string,
    ): this {
        this.messagesQueue.push(new ResolveSymbolSendPacket(symbol, sessionId, seriesId));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
