import WebSocket from 'ws';
import { Sender } from '../../interfaces/sender.interface.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { CreateStudySendPacket } from '../packets/send-packets/study/create-study-send-packet.js';

export class StudyMessageSender implements Sender {
    private messagesQueue: Packet[] = [];
    private sessionId: string | undefined;

    constructor(private ws: WebSocket) {}

    create(
        sessionId: string,
        studyId: string,
        indicatorId: string,
        indicatorParams = {},
    ): this {
        this.sessionId = sessionId;
        this.messagesQueue.push(new CreateStudySendPacket(this.sessionId, studyId, indicatorId, indicatorParams));
        return this;
    }

    send(): void {
        if (this.messagesQueue.length) {
            this.messagesQueue.forEach(message => this.ws.send(message.data));
        }
    }
}
