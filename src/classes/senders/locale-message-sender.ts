import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { SetLocaleSendPacket } from '../packets/send-packets/locale/set-locale-send-packet.js';

export class LocaleMessageSender implements Sender {
    private messagesQueue: Packet[] = [];

    constructor(private ws: WebSocket) {}

    set(locale: [string, string]): this {
        this.messagesQueue.push(new SetLocaleSendPacket(locale));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
