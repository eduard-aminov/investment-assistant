import { Message } from '../../../interfaces/message.interface.js';
import { SymbolErrorRawMessageData } from '../../../types/raw-message.type.js';
import { Display } from '../../../interfaces/display.interface.js';

export class SymbolErrorMessage implements Message, Display {
    public data: SymbolErrorRawMessageData;

    constructor(rawData: SymbolErrorRawMessageData) {
        this.data = rawData;
    }

    display(): void {
        console.log(`Symbol Error: {
            sessionId: ${this.data[0]},
            seriesId: ${this.data[1]},
            message: ${this.data[2]},
        }`);
    }

    handle() {
        this.display();
    }
}
