import { IndicatorRequestParamOption } from './indicator-request-param-options.js';

export class IndicatorRequestParamBuilder {
    private params: Record<string, unknown> = {};

    text(value: string): this {
        this.params['text'] = value;
        return this;
    }

    pineId(value: string): this {
        this.params['pineId'] = value;
        return this;
    }

    pineVersion(value: string): this {
        this.params['pineVersion'] = value;
        return this;
    }

    pineFeatures(value: IndicatorRequestParamOption): this {
        this.params['pineFeatures'] = value;
        return this;
    }

    param0(value: IndicatorRequestParamOption): this {
        this.params['in_0'] = value;
        return this;
    }

    param1(value: IndicatorRequestParamOption): this {
        this.params['in_1'] = value;
        return this;
    }

    param2(value: IndicatorRequestParamOption): this {
        this.params['in_2'] = value;
        return this;
    }

    param3(value: IndicatorRequestParamOption): this {
        this.params['in_3'] = value;
        return this;
    }

    param4(value: IndicatorRequestParamOption): this {
        this.params['in_4'] = value;
        return this;
    }

    param5(value: IndicatorRequestParamOption): this {
        this.params['in_5'] = value;
        return this;
    }

    param6(value: IndicatorRequestParamOption): this {
        this.params['in_6'] = value;
        return this;
    }

    param7(value: IndicatorRequestParamOption): this {
        this.params['in_7'] = value;
        return this;
    }

    param8(value: IndicatorRequestParamOption): this {
        this.params['in_8'] = value;
        return this;
    }

    param9(value: IndicatorRequestParamOption): this {
        this.params['in_9'] = value;
        return this;
    }

    build(): object {
        return this.params;
    }
}
