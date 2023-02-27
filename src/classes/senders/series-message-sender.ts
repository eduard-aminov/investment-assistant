import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { CreateSeriesSendPacket } from '../packets/send-packets/series/create-series-send-packet.js';

export class SeriesMessageSender implements Sender {
    private messagesQueue: Packet[] = [];
    private sessionId: string | undefined;
    private seriesId: string | undefined;

    constructor(private ws: WebSocket) {}

    create(
        sessionId: string,
        seriesId: string,
        timeframe: string,
        range: number,
    ): this {
        this.sessionId = sessionId;
        this.seriesId = seriesId;
        this.messagesQueue.push(new CreateSeriesSendPacket(this.sessionId, this.seriesId, timeframe, range));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
