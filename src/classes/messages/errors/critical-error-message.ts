import { Message } from '../../../interfaces/message.interface.js';
import { CriticalErrorRawMessageData } from '../../../types/raw-message.type.js';
import { Display } from '../../../interfaces/display.interface.js';

export class CriticalErrorMessage implements Message, Display {
    public data: CriticalErrorRawMessageData;

    constructor(rawData: CriticalErrorRawMessageData) {
        this.data = rawData;
    }

    display(): void {
        console.log(`Critical Error: {
            sessionId: ${this.data[0]},
            message: ${this.data[1]} ${this.data[2]},
        }`);
    }

    handle() {
        this.display();
    }
}
