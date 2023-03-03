import { RawMessagesPacket } from './raw-messages-packet.js';
import { Packet } from '../../interfaces/packet.interface.js';
import { SymbolResolvedMessage } from '../messages/symbol-resolved-message.js';
import {
    CriticalErrorRawMessageData,
    DuRawMessageData,
    ProtocolErrorRawMessageData,
    QsdRawMessageData,
    QuoteCompletedRawMessageData,
    RawMessage,
    SeriesCompletedRawMessageData,
    SeriesLoadingRawMessageData,
    StudyCompletedRawMessageData,
    StudyErrorRawMessageData,
    StudyLoadingRawMessageData,
    SymbolErrorRawMessageData,
    SymbolResolvedRawMessageData,
    TimescaleUpdateRawMessageData
} from '../../types/raw-message.type.js';
import { UnknownMessage } from '../messages/unknown-message.js';
import { MessagePacketType } from '../../enums/packet-type.enum.js';
import { ProtocolErrorMessage } from '../messages/errors/protocol-error-message.js';
import { QuoteCompletedMessage } from '../messages/quote-completed-message.js';
import { Message } from '../../interfaces/message.interface.js';
import { QsdMessage } from '../messages/qsd-message.js';
import { CriticalErrorMessage } from '../messages/errors/critical-error-message.js';
import { SymbolErrorMessage } from '../messages/errors/symbol-error-message.js';
import { SeriesLoadingMessage } from '../messages/series-loading-message.js';
import { TimescaleUpdateMessage } from '../messages/timescale-update-message.js';
import { SeriesCompletedMessage } from '../messages/series-completed-message.js';
import { StudyErrorMessage } from '../messages/errors/study-error-message.js';
import { StudyLoadingMessage } from '../messages/study-loading-message.js';
import { StudyCompletedMessage } from '../messages/study-completed-message.js';
import { DuMessage } from '../messages/du-message.js';

export class MessagesPacket implements Packet {
    data: Message[];

    hasInitialMessage = false;

    constructor(rawMessagesPacket: RawMessagesPacket) {
        const rawMessages: RawMessage[] = rawMessagesPacket.data.map(message => JSON.parse(message));
        this.hasInitialMessage = !rawMessages[0]?.m;
        this.data = this.resolveAndCreateMessages(rawMessages);
    }

    private resolveAndCreateMessages(rawMessages: RawMessage[]): Message[] {
        return rawMessages.map(rawMessage => {
            switch (rawMessage.m) {
                case MessagePacketType.SymbolResolved:
                    return new SymbolResolvedMessage(rawMessage.p as SymbolResolvedRawMessageData);
                case MessagePacketType.SeriesLoading:
                    return new SeriesLoadingMessage(rawMessage.p as SeriesLoadingRawMessageData);
                case MessagePacketType.SeriesCompleted:
                    return new SeriesCompletedMessage(rawMessage.p as SeriesCompletedRawMessageData);
                case MessagePacketType.StudyLoading:
                    return new StudyLoadingMessage(rawMessage.p as StudyLoadingRawMessageData);
                case MessagePacketType.StudyCompleted:
                    return new StudyCompletedMessage(rawMessage.p as StudyCompletedRawMessageData);
                case MessagePacketType.TimescaleUpdate:
                    return new TimescaleUpdateMessage(rawMessage.p as TimescaleUpdateRawMessageData);
                case MessagePacketType.QuoteCompleted:
                    return new QuoteCompletedMessage(rawMessage.p as QuoteCompletedRawMessageData);
                case MessagePacketType.Qsd:
                    return new QsdMessage(rawMessage.p as QsdRawMessageData);
                case MessagePacketType.Du:
                    return new DuMessage(rawMessage.p as DuRawMessageData);
                case MessagePacketType.ProtocolError:
                    return new ProtocolErrorMessage(rawMessage.p as ProtocolErrorRawMessageData);
                case MessagePacketType.CriticalError:
                    return new CriticalErrorMessage(rawMessage.p as CriticalErrorRawMessageData);
                case MessagePacketType.SymbolError:
                    return new SymbolErrorMessage(rawMessage.p as SymbolErrorRawMessageData);
                case MessagePacketType.StudyError:
                    return new StudyErrorMessage(rawMessage.p as StudyErrorRawMessageData);
                default:
                    return new UnknownMessage(rawMessage.m);
            }
        });
    }
}
