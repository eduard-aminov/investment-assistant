export interface Indicator {
    id: string;
    name: string;
    sessionId: string;
    seriesId: string;

    buildRequestParams(): object;

    normalizeRawData(data: any): unknown;
}
