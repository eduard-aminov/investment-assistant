export interface Indicator {
    id: string;
    name: string;

    buildRequestParams(): object;

    normalizeRawData(data: any): unknown;
}
