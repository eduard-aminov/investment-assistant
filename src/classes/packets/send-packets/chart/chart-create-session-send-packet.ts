import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class ChartCreateSessionSendPacket {
    data: string;

    constructor(sessionId: string) {
        const sendPacket = new SendPacket({
            m: SendPacketType.ChartCreateSession,
            p: [sessionId]
        });

        this.data = sendPacket.data;
    }
}
