import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class CreateSeriesSendPacket {
    data: string;

    constructor(
        sessionId: string,
        seriesId: string,
        timeframe: string,
        range: number,
    ) {
        const sendPacket = new SendPacket({
            m: SendPacketType.CreateSeries,
            p: [sessionId, 'sds_1', 's1', seriesId, timeframe, range, '']
        });

        this.data = sendPacket.data;
    }
}
