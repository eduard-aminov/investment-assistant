import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class QuoteSetFieldsSendPacket {
    data: string;

    constructor(sessionId: string, fields: string[]) {
        const sendPacket = new SendPacket({
            m: SendPacketType.QuoteSetFields,
            p: [sessionId, ...fields]
        });

        this.data = sendPacket.data;
    }
}
