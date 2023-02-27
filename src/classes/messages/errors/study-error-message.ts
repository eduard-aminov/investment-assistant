import { Message } from '../../../interfaces/message.interface.js';
import { StudyErrorRawMessageData } from '../../../types/raw-message.type.js';
import { Display } from '../../../interfaces/display.interface.js';

export class StudyErrorMessage implements Message, Display {
    public data: StudyErrorRawMessageData;

    constructor(rawData: StudyErrorRawMessageData) {
        this.data = rawData;
    }

    display(): void {
        console.log(`Study Error: {
            sessionId: ${this.data[0]},
            message: ${this.data[3]},
        }`);
    }

    handle() {
        this.display();
    }
}
