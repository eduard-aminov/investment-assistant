import { RawMessagesPacket } from './raw-messages-packet.js';
import { Packet } from '../../interfaces/packet.interface.js';

export class PongPacket implements Packet {
    data: string;

    constructor(rawMessagePacket: RawMessagesPacket) {
        const pingNumber = rawMessagePacket.data[0]!;
        this.data = `~m~${`~h~${pingNumber}`.length}~m~~h~${pingNumber}`;
    }
}
