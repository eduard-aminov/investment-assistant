import { RawData } from 'ws';
import { Packet } from '../../interfaces/packet.interface.js';

const cleanerRgx = /~h~/g;
const splitterRgx = /~m~[0-9]+~m~/g;

export class RawMessagesPacket implements Packet {
    data: string[];

    constructor(rawData: RawData) {
        this.data = rawData
            .toString()
            .replace(cleanerRgx, '')
            .split(splitterRgx)
            .filter(data => Boolean(data));
    }

    isPing(): boolean {
        if (this.data?.length) {
            return !!Number(this.data[0]!);
        }
        return false;
    };
}
