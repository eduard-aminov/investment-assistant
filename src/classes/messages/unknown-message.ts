import { Message } from '../../interfaces/message.interface.js';

export class UnknownMessage implements Message {
    constructor(private message: string) {}

    handle() {
        throw new Error(`Unknown message: ${this.message}`);
    }
}
