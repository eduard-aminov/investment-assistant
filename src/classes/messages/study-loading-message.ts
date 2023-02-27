import { Message } from '../../interfaces/message.interface.js';
import { StudyLoadingRawMessageData } from '../../types/raw-message.type.js';

export class StudyLoadingMessage implements Message {
    sessionId: string;
    seriesId: string;
    data: string;

    constructor(rawData: StudyLoadingRawMessageData) {
        this.sessionId = rawData[0];
        this.seriesId = rawData[1];
        this.data = rawData[2];
    }

    handle() {

    }
}
