import { Message } from '../../interfaces/message.interface.js';
import { SeriesCompletedRawMessageData } from '../../types/raw-message.type.js';

export class SeriesCompletedMessage implements Message {
    sessionId: string;
    seriesId: string;
    data: SeriesCompletedRawMessageData;

    constructor(rawData: SeriesCompletedRawMessageData) {
        this.sessionId = rawData[0];
        this.seriesId = rawData[1];
        this.data = rawData;
    }

    handle() {

    }
}
