import { Message } from '../../interfaces/message.interface.js';
import { QsdRawMessageData } from '../../types/raw-message.type.js';

export class QsdMessage implements Message {
    sessionId: string;
    symbol: string;
    data: unknown;

    constructor(rawData: QsdRawMessageData) {
        this.sessionId = rawData[0];
        this.symbol = rawData[1].n;
        this.data = rawData[1].v;
    }

    handle() {

    }
}
