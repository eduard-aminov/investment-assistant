import { DuRawMessageData } from '../types/raw-message.type.js';

export interface Message {
    data: any;

    handle(handlers: {
        du: (data: DuRawMessageData) => void
    }): void;
}
