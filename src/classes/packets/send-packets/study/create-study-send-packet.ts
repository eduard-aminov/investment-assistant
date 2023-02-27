import { SendPacket } from '../../send-packet.js';
import { SendPacketType } from '../../../../enums/packet-type.enum.js';

export class CreateStudySendPacket {
    data: string;

    constructor(
        sessionId: string,
        studyId: string,
        indicatorId: string,
        indicatorParams = {},
    ) {
        const sendPacket = new SendPacket({
            m: SendPacketType.CreateStudy,
            p: [sessionId, studyId, 'st1', 'sds_1', indicatorId, indicatorParams]
        });

        this.data = sendPacket.data;
    }
}
