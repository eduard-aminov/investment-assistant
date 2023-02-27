import { DuRawMessageData } from '../types/raw-message.type.js';

export interface Message {
    handle(handlers: {
        du: (data: DuRawMessageData) => void
    }): void;
}
