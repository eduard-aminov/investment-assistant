import { LineIndicator } from '../../../interfaces/line-indicator.interface.js';
import { IndicatorRequestParamBuilder } from '../indicator-request/indicator-request-param-builder.js';
import {
    IndicatorRequestParamBoolOption,
    IndicatorRequestParamIntegerOption,
    IndicatorRequestParamSourceOption
} from '../indicator-request/indicator-request-param-options.js';

interface MtfEmaIndicatorOptions {
    length: number;
    data: 'open' | 'close' | 'high' | 'low';
    show5M: boolean;
    show15M: boolean;
    show30M: boolean;
    show1H: boolean;
    show2H: boolean;
    show4H: boolean;
    show1D: boolean;
}

const DEFAULT_OPTIONS: MtfEmaIndicatorOptions = {
    length: 9,
    data: 'close',
    show5M: false,
    show15M: false,
    show30M: false,
    show1H: false,
    show2H: false,
    show4H: false,
    show1D: false,
};

export class MtfEmaIndicator implements LineIndicator {
    sessionId: string;
    seriesId: string;
    id: string;
    name: string;
    length: number;

    private _options: MtfEmaIndicatorOptions;
    // @ts-ignore
    private _fractionalPartLength: number | undefined;

    constructor(name: string, options: Partial<MtfEmaIndicatorOptions> & { length: number }) {
        this.sessionId = `${name}_${Math.random()}`;
        this.seriesId = `${name}_${Math.random()}`;
        this._options = { ...DEFAULT_OPTIONS, ...options };
        this.id = 'Script@tv-scripting-101!';
        this.name = name;
        this.length = this._options.length;
    }

    setFractionPartLength(length: number): this {
        this._fractionalPartLength = length;
        return this;
    }

    buildRequestParams(): object {
        return new IndicatorRequestParamBuilder()
            .text('0DdSUE8wRzucFjlqHB91ag==_kyPbu4glBrkcG0brD4FhCw9577CTnQBq6OFqKimD/nRUEp68X5RDyO3r/SvZ4VtLyqMYsAGMrLEM42I/ZahhslmF3H0oI8txp4Czd/AKwxu1Ck+ssZnWbqN0V5CMsYek+zYNquC4dc7um4h/EpxRVkVMrJMxvxJS3yUuFYPLhRaIVGhjShxinlYtiRxIrGFlPDey7ML5xj0RHTZe4RgOIwLC562AhxrmL60xy+K6hc+I0pPyoNPh6+qbVyzV9HZH/ZggUQLl9q0SYkMqBxu64rFsGU571PNnHKkaX0hvOGam1OyPrj0EhJMdQkwBpLvgQGk89mF1ZnkxdKehSfTfhc1nO7DECW5wx2apsLc1/Ccj6jP/Y5xWi83o6Ex/OB37mcrItv8P6Q+2me97dw4KFf5RQl5i8HavBWAh2bP+UMwQheoOMyJSZHdvVxYxe3LyrueAsxCROhmIBbJ1D+QHEPCL+e2+PVj1Nc9iBwn2zwDSYPTFkDoWla3fknCecrc/ZIGenI2vQT/coJZJC5loA5ziAMmm38btwzd7Whox9m5C+QHk4TIfIJ7FGVAxs1BL9O2MZujNM1K6ic/TloPQcKMUU9pitUpctJ07vrZ12AMLSAVlFjUw+wH/+J3ABwTsOhEvRCnrAoM0dhu8IEOurBP20DbjP6m2NpIjagL4ejt3l7qP22+Tn11V7eaHmF2u6RTNrKjeG0bJXlLRWlLtnFANqd3E1XxdkLOR8egUTaKAggUSqHZ8G2prfIDzVu7Q6j7DEIqczdFK2uNSfQoUCYqZK6pJYeDiE9yGyeHZ0K0IdG2PWB+2sn1SIuh8Lfa7FZjqjRBoMEBP2GAwMoG6tOBmfWSonXJrOmr5yYXlWw96UontIbY6xty6B4cJ0bDlQdGUy2vocxZcqAkXEezPVko7cAhKaNxeJkp0oiAEtxz+I1UgkWwnzetKQMhFnsDpELAnpYZLc55R6QEMoz9c1Lrli4WbaZGN4thBlgnmrhLaR8ftieieBuLJC/as+1qn3n+31ZNlpWFz5aI81ibGQ5T/asu4x6hck4X7cuO2OO3if8/NdLy3XXD2m74m057hZzM3CuVJJqpsyo7oOHB6uEf1Vajk2PGS2YEBG7H0pxRi/FbYdbjakDmVWNHjvoXOPaGtQcsFLoLU4ksL7y3YddanWj4CiqqMLsSTuCoL4GSOW39YAILk/rUSW1zt5Gg5hZ4pVzIIFejPIhr2HZLfA15lto8oUufGgkBXMqBqHR+ydWt6fyL07/wwpWJ28npB65WHB4KwtCo4NZncuw0mWq7gBpmQmvFBXUlmVK+ZwLvJu6aZG9PGb3Th37DkDYbza3B0jN16NvpoYh/c8AzrWjJoOMPdNR0bvSQVzvLxhpbFzxLLBnAi9m2Kds7gbRzZJ1mczkiS4vND2At+LPoauvpI0fRqxytQYIuY2ZJJbL7r07zphlT6jW3tTd0CSxImjDOEhaaxAvqzAk+U0whhlMYvv20P51HMzmKa2cdK93AO6TKm6STlxavS0CvTlONRhCVAV2OfU4XvmGFnKGLYm1SI8ozQNDIPcChGUj/OOCDveNbj1ul2VyjLefmRZhz7UOTdOZJlO+V9BnP/UcZtMMa8bMXZZFXhK3YPBnTGvp2uj7xdFPCfUaxUn24TxgwSnkmRqvMJ5loWLfALS3YLruU8HFz2IRUuTYYNVcaG4uK0pVK+EzPQpoN09kwnqlng8Ktv9TXvhyV9MYdmmwyyvAUv5dJc+KxpNSHqDEXfxUL3MByggGWjuiDtbEHMZupRcRPS6x4YelcsoJRXfRv6g6uKrGCJUJpcTENb81ntsMho/lLxXXc9SEujyBi2hMmUA/JQMQXjqxtfD4b+3XTQbQuJl8Rd6Q==')
            .pineId('PUB;1085')
            .pineVersion('-1.0')
            .param0(new IndicatorRequestParamIntegerOption(this._options.length))
            .param1(new IndicatorRequestParamSourceOption(this._options.data))
            .param2(new IndicatorRequestParamBoolOption(this._options.show5M))
            .param3(new IndicatorRequestParamBoolOption(this._options.show15M))
            .param4(new IndicatorRequestParamBoolOption(this._options.show30M))
            .param5(new IndicatorRequestParamBoolOption(this._options.show1H))
            .param6(new IndicatorRequestParamBoolOption(this._options.show2H))
            .param7(new IndicatorRequestParamBoolOption(this._options.show4H))
            .param8(new IndicatorRequestParamBoolOption(this._options.show1D))
            .build();
    }

    normalizeRawData(data: any): unknown {
        const result = data.st?.at(-1)?.v?.map((i: number) => {
            if (String(i).includes('e')) {
                return null;
            }
            return this._fractionalPartLength ? i.toFixed(this._fractionalPartLength) : i;
        });

        const M1 = result[1];
        const M5 = result[2];
        const M15 = result[4];
        const M30 = result[6];
        const H1 = result[8];
        const H2 = result[10];
        const H4 = result[12];
        const D1 = result[14];

        return `
            1M: ${M1 ?? 'no data'},
            5M: ${M5 ?? 'no data'},
            15M: ${M15 ?? 'no data'},
            30M: ${M30 ?? 'no data'},
            1H: ${H1 ?? 'no data'},
            2H: ${H2 ?? 'no data'},
            4H: ${H4 ?? 'no data'},
            1D: ${D1 ?? 'no data'},
        `;
    }
}
