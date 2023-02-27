import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { SetAuthTokenSendPacket } from '../packets/send-packets/auth/set-auth-token-send-packet.js';

export class AuthMessageSender implements Sender {
    private messagesQueue: Packet[] = [];

    constructor(private ws: WebSocket) {}

    setToken(token: string): this {
        this.messagesQueue.push(new SetAuthTokenSendPacket(token));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
