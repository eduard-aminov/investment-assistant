import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class QuoteFastSymbolsSendPacket {
    data: string;

    constructor(sessionId: string) {
        const sendPacket = new SendPacket({
            m: SendPacketType.QuoteFastSymbols,
            p: [sessionId]
        });

        this.data = sendPacket.data;
    }
}
