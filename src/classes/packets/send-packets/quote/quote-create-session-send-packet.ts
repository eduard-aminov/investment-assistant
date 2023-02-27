import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class QuoteCreateSessionSendPacket {
    data: string;

    constructor(sessionId: string) {
        const sendPacket = new SendPacket({
            m: SendPacketType.QuoteCreateSession,
            p: [sessionId]
        });

        this.data = sendPacket.data;
    }
}
