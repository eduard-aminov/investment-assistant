import { Message } from '../../interfaces/message.interface.js';
import { DuRawMessageData } from '../../types/raw-message.type.js';

export class DuMessage implements Message {
    sessionId: string;
    data: DuRawMessageData;

    constructor(rawData: DuRawMessageData) {
        this.sessionId = rawData[0];
        this.data = rawData;
    }

    handle(handlers: { du: (data: DuRawMessageData) => void }) {
        handlers?.du(this.data);
    }
}
