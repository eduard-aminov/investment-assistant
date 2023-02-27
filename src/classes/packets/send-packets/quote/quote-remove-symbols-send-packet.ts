import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class QuoteRemoveSymbolsSendPacket {
    data: string;

    constructor(sessionId: string, symbols: string[]) {
        const sendPacket = new SendPacket({
            m: SendPacketType.QuoteRemoveSymbols,
            p: [sessionId, ...symbols]
        });

        this.data = sendPacket.data;
    }
}
