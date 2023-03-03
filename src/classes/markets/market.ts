export class Market {
    constructor(public symbol: string) {}

    genSessionID(): string {
        return `${this.symbol}_$`;
    }

    genSeriesID(): string {
        return `${this.symbol}_$$`;
    }
}
