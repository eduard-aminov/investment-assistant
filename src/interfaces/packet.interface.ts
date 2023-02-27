import { Message } from './message.interface.js';

export interface Packet {
    data: Message[] | string[] | string;
}
