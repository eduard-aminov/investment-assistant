import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { QuoteCreateSessionSendPacket } from '../packets/send-packets/quote/quote-create-session-send-packet.js';
import { QuoteSetFieldsSendPacket } from '../packets/send-packets/quote/quote-set-fields-send-packet.js';
import { QuoteFastSymbolsSendPacket } from '../packets/send-packets/quote/quote-fast-symbols-send-packet.js';
import { QuoteAddSymbolsSendPacket } from '../packets/send-packets/quote/quote-add-symbols-send-packet.js';
import { QuoteRemoveSymbolsSendPacket } from '../packets/send-packets/quote/quote-remove-symbols-send-packet.js';

export class QuoteMessageSender implements Sender {
    private messagesQueue: Packet[] = [];
    private sessionId: string | undefined;

    constructor(private ws: WebSocket) {}

    createSession(sessionId: string): this {
        this.sessionId = sessionId;
        this.messagesQueue.push(new QuoteCreateSessionSendPacket(this.sessionId));
        return this;
    }

    setFields(fields: string[]): this {
        this.validateSessionId();
        this.messagesQueue.push(new QuoteSetFieldsSendPacket(this.sessionId!, fields));
        return this;
    }

    fastSymbols(): this {
        this.validateSessionId();
        this.messagesQueue.push(new QuoteFastSymbolsSendPacket(this.sessionId!));
        return this;
    }

    addSymbols(symbols: string[]): this {
        this.validateSessionId();
        this.messagesQueue.push(new QuoteAddSymbolsSendPacket(this.sessionId!, symbols));
        return this;
    }

    removeSymbols(symbols: string[]): this {
        this.validateSessionId();
        this.messagesQueue.push(new QuoteRemoveSymbolsSendPacket(this.sessionId!, symbols));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }

    private validateSessionId(): void {
        if (!this.sessionId) {
            throw new Error(`Please call createSession first`);
        }
    }
}
