import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { ChartCreateSessionSendPacket } from '../packets/send-packets/chart/chart-create-session-send-packet.js';

export class ChartMessageSender implements Sender {
    private messagesQueue: Packet[] = [];
    private sessionId: string | undefined;

    constructor(private ws: WebSocket) {}

    createSession(sessionId: string): this {
        this.sessionId = sessionId;
        this.messagesQueue.push(new ChartCreateSessionSendPacket(this.sessionId));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
