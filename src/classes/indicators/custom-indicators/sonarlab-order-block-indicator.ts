import { IndicatorRequestParamBuilder } from '../indicator-request/indicator-request-param-builder.js';
import {
    IndicatorRequestParamBoolOption,
    IndicatorRequestParamColorOption,
    IndicatorRequestParamIntegerOption,
    IndicatorRequestParamTextOption
} from '../indicator-request/indicator-request-param-options.js';

interface SonarlabOrderBlockIndicatorOptions {
    sensitivity: number;
    mitigationType: 'Close';
    timeframe: string;
}

const DEFAULT_OPTIONS: SonarlabOrderBlockIndicatorOptions = {
    sensitivity: 28,
    mitigationType: 'Close',
    timeframe: '5',
};

export class SonarlabOrderBlockIndicator {
    sessionId: string;
    seriesId: string;
    id: string;
    name: string;
    timeframe: string;

    private _options: SonarlabOrderBlockIndicatorOptions;

    constructor(name: string, options?: Partial<SonarlabOrderBlockIndicatorOptions>) {
        this.sessionId = `${name}_${Math.random()}`;
        this.seriesId = `${name}_${Math.random()}`;
        this._options = { ...DEFAULT_OPTIONS, ...options };
        this.id = 'Script@tv-scripting-101!';
        this.name = name;
        this.timeframe = this._options.timeframe;
    }

    buildRequestParams(): object {
        return new IndicatorRequestParamBuilder()
            .text('bmI9Ks46_jIHCQWs/heEV1m4pXr5IZg==_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')
            .pineId('PUB;0df0d45ee6034863bd8ab8d28958e78f')
            .pineVersion('5.0')
            .pineFeatures(new IndicatorRequestParamTextOption('{\\"indicator\\":1,\\"array\\":1,\\"ta\\":1,\\"alert\\":1,\\"box\\":1}'))
            .param0(new IndicatorRequestParamTextOption('1.0.2'))
            .param1(new IndicatorRequestParamIntegerOption(this._options.sensitivity))
            .param2(new IndicatorRequestParamTextOption(this._options.mitigationType))
            .param3(new IndicatorRequestParamColorOption('#5db49e'))
            .param4(new IndicatorRequestParamColorOption('rgba(100,196,172,0.15)'))
            .param5(new IndicatorRequestParamColorOption('#4760bb'))
            .param6(new IndicatorRequestParamColorOption('rgba(80,108,211,0.15)'))
            .param7(new IndicatorRequestParamBoolOption(true))
            .param8(new IndicatorRequestParamBoolOption(true))
            .build();
    }

    normalizeRawData(data: any): number {
        const min = Math.min(...JSON.parse(data?.ns?.d)?.graphicsCmds?.create?.dwgboxes?.map((box: any) => box?.data.map((value: any) => value?.y2)).flat());

        console.log(min);
        return min;
    }
}
