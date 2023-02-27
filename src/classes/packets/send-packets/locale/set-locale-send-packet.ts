import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class SetLocaleSendPacket {
    data: string;

    constructor(locale: [string, string]) {
        const sendPacket = new SendPacket({
            m: SendPacketType.SetLocale,
            p: locale
        });

        this.data = sendPacket.data;
    }
}
