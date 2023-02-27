import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class ResolveSymbolSendPacket {
    data: string;

    constructor(
        symbol: string,
        sessionId: string,
        seriesId: string,
    ) {
        const sendPacket = new SendPacket({
            m: SendPacketType.ResolveSymbol,
            p: [
                sessionId,
                seriesId,
                `=${JSON.stringify({
                    symbol,
                    session: 'regular',
                    adjustment: 'splits',
                })}`
            ]
        });

        this.data = sendPacket.data;
    }
}
