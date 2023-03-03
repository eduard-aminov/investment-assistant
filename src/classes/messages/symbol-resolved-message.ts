import { Message } from '../../interfaces/message.interface.js';
import { SymbolResolvedRawMessageData } from '../../types/raw-message.type.js';

export class SymbolResolvedMessage implements Message {
    sessionId: string;
    symbol: string;
    data: SymbolResolvedRawMessageData;

    constructor(rawData: SymbolResolvedRawMessageData) {
        this.sessionId = rawData[0];
        this.symbol = rawData[1];
        this.data = rawData;
    }

    handle() {

    }
}
