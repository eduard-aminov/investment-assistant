import { Message } from '../../interfaces/message.interface.js';
import { SeriesLoadingRawMessageData } from '../../types/raw-message.type.js';

export class SeriesLoadingMessage implements Message {
    sessionId: string;
    seriesId: string;
    data: string;

    constructor(rawData: SeriesLoadingRawMessageData) {
        this.sessionId = rawData[0];
        this.seriesId = rawData[1];
        this.data = rawData[2];
    }

    handle() {

    }
}
