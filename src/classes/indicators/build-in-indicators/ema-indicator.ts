import { LineIndicator } from '../../../interfaces/line-indicator.interface.js';
import { IndicatorRequestParamBuilder } from '../indicator-request/indicator-request-param-builder.js';
import {
    IndicatorRequestParamBoolOption,
    IndicatorRequestParamIntegerOption,
    IndicatorRequestParamResolutionOption,
    IndicatorRequestParamSourceOption,
    IndicatorRequestParamTextOption
} from '../indicator-request/indicator-request-param-options.js';

interface EmaIndicatorOptions {
    timeframe: string;
    length: number;
    data: 'open' | 'close' | 'high' | 'low';
    offset: number;
    smoothing: {
        method: 'SMA' | 'EMA' | 'SMMA (RMA)' | 'WMA' | 'VWMA';
        length: number;
    };
    gaps: boolean;
}

const DEFAULT_OPTIONS: EmaIndicatorOptions = {
    timeframe: '',
    length: 9,
    data: 'close',
    offset: 0,
    smoothing: {
        method: 'SMA',
        length: 5,
    },
    gaps: true,
};

export class EmaIndicator implements LineIndicator {
    length: number;
    id: string;

    private _options: EmaIndicatorOptions;

    constructor(options: Partial<EmaIndicatorOptions>) {
        this._options = { ...DEFAULT_OPTIONS, ...options };
        this.id = 'Script@tv-scripting-101!';
        this.length = this._options.length;
    }

    buildRequestParams(): object {
        return new IndicatorRequestParamBuilder()
            .text('HMwOauCFw8JvToAwj2FK9g==_KRYiKg4X79kPE5y1kRdQyCOIUxgfh0f2d7p6TYkctS1Sg/HFX0zLPV9bRpWSQwaIn+w8u6gMH77yHIzReQt4c8M10HqqJ4pESRmR4rUh/JLd86o7sUW6tAsND2PmICm+ctA28845uUh07VUlXXO3OKeVBcKvjaSaiZYMGg9UrS0RIKKOI0yWm3U1SjOpLJurPfFjANlQeLRYfFXPxIOAaHovM1gbm2JrzFz1I1J8kjWw2HOThlCxO8HDWaHSQTPBO6B7w5vkSM/DGQgZEqDxv+iUxUnEBalOMBlDUuUPU4qAidK/jPOvZ4LmWTW4lpqHt4p/AbVzdBaKasYkZNg9UTB4pDe/Ms7stSYpvT3DXLTrsmObRsGZudPgW0daAnVyUhAykzZmy9tqDlFyGrx+CLVJ8uTvDnJPdJtIfQzDBuORTVlFfm3e6yraR2fB/or1+62puNX6Er3PB9AI8oT2Ao32rc0od9HVKS8c1LYl2/w4Fl7rtGo9myVSU+0w5tFHoWq8l9Bdwy0ivOr7rxIjgZXh7EW24PRYuzfvh9jz3LtKZmp3QtIxLAKg/OqjCjvhRVu+YD4E8LcpaNn4aAxUQzXAexkMfg2LSUl7yk6OgSXtQBdC8Hhv36kRxp1eHg+OlWPwA7m8l8e+c2hiPItn+7LAvWqCbURBZxTKZBI/ggyTFUYHKYibUN/CP8Oo')
            .pineId('STD;EMA')
            .pineVersion('29.0')
            .pineFeatures(new IndicatorRequestParamTextOption('{"indicator":1,"plot":1,"ta":1}'))
            .param0(new IndicatorRequestParamIntegerOption(this._options.length))
            .param1(new IndicatorRequestParamSourceOption(this._options.data))
            .param2(new IndicatorRequestParamIntegerOption(this._options.offset))
            .param3(new IndicatorRequestParamTextOption(this._options.smoothing.method))
            .param4(new IndicatorRequestParamIntegerOption(this._options.smoothing.length))
            .param5(new IndicatorRequestParamResolutionOption(this._options.timeframe))
            .param6(new IndicatorRequestParamBoolOption(this._options.gaps))
            .build();
    }
}
