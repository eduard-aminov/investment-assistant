export class Market {
    constructor(private symbol: string) {}

    genSessionID(): string {
        return `${this.symbol}_$`
    }

    genSeriesID(): string {
        return `${this.symbol}_$$`
    }
}
