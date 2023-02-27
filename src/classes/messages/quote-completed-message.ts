import { Message } from '../../interfaces/message.interface.js';
import { QuoteCompletedRawMessageData } from '../../types/raw-message.type.js';

export class QuoteCompletedMessage implements Message {
    sessionId: string;
    symbol: string;

    constructor(rawData: QuoteCompletedRawMessageData) {
        this.sessionId = rawData[0];
        this.symbol = rawData[1];
    }

    handle() {

    }
}
