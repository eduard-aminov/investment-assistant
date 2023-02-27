import { Message } from '../../interfaces/message.interface.js';
import { StudyCompletedRawMessageData } from '../../types/raw-message.type.js';

export class StudyCompletedMessage implements Message {
    sessionId: string;
    studyId: string;
    data: StudyCompletedRawMessageData;

    constructor(rawData: StudyCompletedRawMessageData) {
        this.sessionId = rawData[0];
        this.studyId = rawData[1];
        this.data = rawData;
    }

    handle() {

    }
}
