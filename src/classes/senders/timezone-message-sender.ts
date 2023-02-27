import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { SwitchTimezoneSendPacket } from '../packets/send-packets/timezone/switch-timezone-send-packet.js';

export class TimezoneMessageSender implements Sender {
    private messagesQueue: Packet[] = [];
    private sessionId: string | undefined;

    constructor(private ws: WebSocket) {}

    switch(sessionId: string, timezone: string): this {
        this.sessionId = sessionId;
        this.messagesQueue.push(new SwitchTimezoneSendPacket(this.sessionId, timezone));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
