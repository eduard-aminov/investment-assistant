import { SendPacketType } from '../enums/packet-type.enum.js';

export type SendPacketOptions<P> = {
    m: SendPacketType;
    p: P;
}
