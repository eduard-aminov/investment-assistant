import { MessagePacketType } from '../enums/packet-type.enum.js';

export type RawMessage = {
    m: MessagePacketType;
    p: unknown;
}

export type SymbolResolvedRawMessageData = [
    string, // sessionId
    string, // seriesId
    string, // symbol data
];

export type SeriesLoadingRawMessageData = [
    string, // sessionId
    string, // seriesId
    string, // data
];

export type StudyLoadingRawMessageData = [
    string, // sessionId
    string, // studyId
    string, // data
];

export type SeriesCompletedRawMessageData = [
    string, // sessionId
    string, // seriesId
    string, // ???
    string, // ???
    string, // ???
];

export type StudyCompletedRawMessageData = [
    string, // sessionId
    string, // studyId
    string, // ???
];

export type TimescaleUpdateRawMessageData = [
    string, // sessionId
    string, // data
];

export type ProtocolErrorRawMessageData = [
    string, // error message
];

export type CriticalErrorRawMessageData = [
    string, // sessionId
    string, // error type
    string, // error message
];

export type SymbolErrorRawMessageData = [
    string, // sessionId
    string, // seriesId
    string, // error message
];

export type StudyErrorRawMessageData = [
    string, // sessionId
    string, // ???
    string, // ???
    string, // error message
];

export type QuoteCompletedRawMessageData = [
    string, // sessionId
    string, // symbol
];

export type QsdRawMessageData = [
    string, // sessionId
    {
        n: string, // symbol
        s: string, // status
        v: Partial<any>
    }
];

export type DuRawMessageData = [
    string, // sessionId
    {
        [key: string]: {
            node: string,
            st: {
                i: number,
                v: number[],
            }[],
            ns: {
                d: string,
                indexes: unknown[]
            },
            t: string,
        }
    }
];
