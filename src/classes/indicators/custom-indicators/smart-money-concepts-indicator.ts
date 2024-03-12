import { IndicatorRequestParamBuilder } from '../indicator-request/indicator-request-param-builder.js';
import {
    IndicatorRequestParamBoolOption,
    IndicatorRequestParamColorOption,
    IndicatorRequestParamFloatOption,
    IndicatorRequestParamIntegerOption,
    IndicatorRequestParamResolutionOption,
    IndicatorRequestParamTextOption
} from '../indicator-request/indicator-request-param-options.js';

interface SmartMoneyConceptsIndicatorOptions {
    timeframe: string;
}

const DEFAULT_OPTIONS: SmartMoneyConceptsIndicatorOptions = {
    timeframe: '5',
};

export class SmartMoneyConceptsIndicator {
    sessionId: string;
    seriesId: string;
    id: string;
    name: string;
    timeframe: string;

    private _options: SmartMoneyConceptsIndicatorOptions;

    constructor(name: string, options?: Partial<SmartMoneyConceptsIndicatorOptions>) {
        this.sessionId = `${name}_${Math.random()}`;
        this.seriesId = `${name}_${Math.random()}`;
        this._options = { ...DEFAULT_OPTIONS, ...options };
        this.id = 'Script@tv-scripting-101!';
        this.name = name;
        this.timeframe = this._options.timeframe;
    }

    buildRequestParams(): object {
        return new IndicatorRequestParamBuilder()
            .text('bmI9Ks46_lc6NaivtXG3vmnMI0Z31Sg==_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')
            .pineId('PUB;6daafb2cabe6419d98ae25229d2327f8')
            .pineVersion('4.0')
            .pineFeatures(new IndicatorRequestParamTextOption('{\\"indicator\\":1,\\"plot\\":1,\\"str\\":1,\\"array\\":1,\\"ta\\":1,\\"math\\":1,\\"alertcondition\\":1,\\"line\\":1,\\"box\\":1,\\"label\\":1,\\"request.security\\":1}'))
            .param(0, new IndicatorRequestParamTextOption('Present'))
            .param(1, new IndicatorRequestParamTextOption('Colored'))
            .param(2, new IndicatorRequestParamBoolOption(false))
            .param(3, new IndicatorRequestParamBoolOption(true))
            .param(4, new IndicatorRequestParamTextOption('All'))
            .param(5, new IndicatorRequestParamColorOption('4286683400'))
            .param(6, new IndicatorRequestParamTextOption('All'))
            .param(7, new IndicatorRequestParamColorOption('4282726130'))
            .param(8, new IndicatorRequestParamBoolOption(false))
            .param(9, new IndicatorRequestParamTextOption('Tiny'))
            .param(10, new IndicatorRequestParamBoolOption(true))
            .param(11, new IndicatorRequestParamTextOption('All'))
            .param(12, new IndicatorRequestParamColorOption('4286683400'))
            .param(13, new IndicatorRequestParamTextOption('All'))
            .param(14, new IndicatorRequestParamColorOption('4282726130'))
            .param(15, new IndicatorRequestParamTextOption('Small'))
            .param(16, new IndicatorRequestParamBoolOption(true))
            .param(17, new IndicatorRequestParamIntegerOption(50))
            .param(18, new IndicatorRequestParamBoolOption(true))
            .param(19, new IndicatorRequestParamBoolOption(false))
            .param(20, new IndicatorRequestParamIntegerOption(5))
            .param(21, new IndicatorRequestParamBoolOption(false))
            .param(22, new IndicatorRequestParamIntegerOption(5))
            .param(23, new IndicatorRequestParamTextOption('Atr'))
            .param(24, new IndicatorRequestParamColorOption('871725361'))
            .param(25, new IndicatorRequestParamColorOption('864058615'))
            .param(26, new IndicatorRequestParamColorOption('869025816'))
            .param(27, new IndicatorRequestParamColorOption('858990770'))
            .param(28, new IndicatorRequestParamBoolOption(false))
            .param(29, new IndicatorRequestParamIntegerOption(3))
            .param(30, new IndicatorRequestParamFloatOption(0.1))
            .param(31, new IndicatorRequestParamTextOption('Tiny'))
            .param(32, new IndicatorRequestParamBoolOption(false))
            .param(33, new IndicatorRequestParamBoolOption(true))
            .param(34, new IndicatorRequestParamResolutionOption(''))
            .param(35, new IndicatorRequestParamColorOption('1298726656'))
            .param(36, new IndicatorRequestParamColorOption('2164785407'))
            .param(37, new IndicatorRequestParamIntegerOption(200))
            .param(38, new IndicatorRequestParamBoolOption(false))
            .param(39, new IndicatorRequestParamTextOption('⎯⎯⎯'))
            .param(40, new IndicatorRequestParamColorOption('4294137633'))
            .param(41, new IndicatorRequestParamBoolOption(false))
            .param(42, new IndicatorRequestParamTextOption('⎯⎯⎯'))
            .param(43, new IndicatorRequestParamColorOption('4294137633'))
            .param(44, new IndicatorRequestParamBoolOption(false))
            .param(45, new IndicatorRequestParamTextOption('⎯⎯⎯'))
            .param(46, new IndicatorRequestParamColorOption('4294137633'))
            .param(47, new IndicatorRequestParamBoolOption(true))
            .param(48, new IndicatorRequestParamColorOption('4265948914'))
            .param(49, new IndicatorRequestParamColorOption('4290688434'))
            .param(50, new IndicatorRequestParamColorOption('4286683400'))
            .build();
    }

    normalizeRawData(data: any): any {
        if (!data?.ns?.d) {
            return null;
        }

        try {
            const value = JSON.parse(data?.ns?.d);
            if (value?.graphicsCmds?.create) {
                // const currentPrice = data?.st?.find((v: any) => v.i === 99)?.v?.[4];
                const premiumValue = value?.graphicsCmds?.create?.dwglabels[0]?.data?.find((box: any) => box.t === 'Premium')?.y;
                const discountValue = value?.graphicsCmds?.create?.dwglabels[0]?.data?.find((box: any) => box.t === 'Discount')?.y;
                const boses = value?.graphicsCmds?.create?.dwglabels[0]?.data?.filter((box: any) => box.t === 'BOS').map((i: any) => ({
                    value: i.y,
                    direction: i.st === 'lup'
                               ? 'S'
                               : i.st === 'ldn'
                                 ? 'L'
                                 : null
                }));
                return {
                    timeframe: this.timeframe,
                    value: {
                        // currentPrice,
                        premiumValue,
                        discountValue,
                        boses,
                    }
                };
            }
            return null;
        } catch {
            return null;
        }
    }
}
