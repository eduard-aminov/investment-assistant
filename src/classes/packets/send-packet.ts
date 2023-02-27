import { Packet } from '../../interfaces/packet.interface.js';
import { SendPacketOptions } from '../../types/packet-options.type.js';

export class SendPacket<P> implements Packet {
    data: string;

    constructor(options: SendPacketOptions<P>) {
        const msg = JSON.stringify(options);
        this.data = `~m~${msg.length}~m~${msg}`;
    }
}
