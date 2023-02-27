import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class SwitchTimezoneSendPacket {
    data: string;

    constructor(sessionId: string, timezone: string) {
        const sendPacket = new SendPacket({
            m: SendPacketType.SwitchTimezone,
            p: [sessionId, timezone]
        });

        this.data = sendPacket.data;
    }
}
