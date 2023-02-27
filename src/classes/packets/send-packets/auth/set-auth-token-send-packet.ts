import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class SetAuthTokenSendPacket {
    data: string;

    constructor(token: string) {
        const sendPacket = new SendPacket({
            m: SendPacketType.SetAuthToken,
            p: [token]
        });

        this.data = sendPacket.data;
    }
}
