import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class QuoteAddSymbolsSendPacket {
    data: string;

    constructor(sessionId: string, symbols: string[]) {
        const sendPacket = new SendPacket({
            m: SendPacketType.QuoteAddSymbols,
            p: [sessionId, ...symbols]
        });

        this.data = sendPacket.data;
    }
}
