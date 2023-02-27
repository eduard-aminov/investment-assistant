import { Message } from '../../interfaces/message.interface.js';
import { TimescaleUpdateRawMessageData } from '../../types/raw-message.type.js';

export class TimescaleUpdateMessage implements Message {
    sessionId: string;
    data: string;

    constructor(rawData: TimescaleUpdateRawMessageData) {
        this.sessionId = rawData[0];
        this.data = rawData[1];
    }

    handle() {

    }
}
