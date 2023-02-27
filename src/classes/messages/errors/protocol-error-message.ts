import { Message } from '../../../interfaces/message.interface.js';
import { ProtocolErrorRawMessageData } from '../../../types/raw-message.type.js';
import { Display } from '../../../interfaces/display.interface.js';

export class ProtocolErrorMessage implements Message, Display {
    public data: ProtocolErrorRawMessageData;

    constructor(rawData: ProtocolErrorRawMessageData) {
        this.data = rawData;
    }

    display(): void {
        console.log(`Protocol Error: {
            message: ${this.data[0]}
        }`);
    }

    handle() {
        this.display();
    }
}
