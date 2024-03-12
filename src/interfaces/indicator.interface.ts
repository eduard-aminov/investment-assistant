export interface Indicator {
    id: string;
    name: string;
    timeframe?: string;

    buildRequestParams(): object;

    normalizeRawData(data: any, additionalData?: any): unknown;
}
