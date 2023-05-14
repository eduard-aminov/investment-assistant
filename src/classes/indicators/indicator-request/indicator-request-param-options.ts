export type IndicatorRequestParamOption =
    IndicatorRequestParamTextOption |
    IndicatorRequestParamSourceOption |
    IndicatorRequestParamIntegerOption |
    IndicatorRequestParamBoolOption |
    IndicatorRequestParamResolutionOption |
    IndicatorRequestParamColorOption;

export class IndicatorRequestParamTextOption {
    v: string;
    f: boolean;
    t: 'text';

    constructor(value: string, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'text';
    }
}

export class IndicatorRequestParamIntegerOption {
    v: number;
    f: boolean;
    t: 'integer';

    constructor(value: number, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'integer';
    }
}

export class IndicatorRequestParamBoolOption {
    v: boolean;
    f: boolean;
    t: 'bool';

    constructor(value: boolean, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'bool';
    }
}

export class IndicatorRequestParamSourceOption {
    v: string;
    f: boolean;
    t: 'source';

    constructor(value: string, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'source';
    }
}

export class IndicatorRequestParamResolutionOption {
    v: string;
    f: boolean;
    t: 'resolution';

    constructor(value: string, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'resolution';
    }
}

export class IndicatorRequestParamColorOption {
    v: string;
    f: boolean;
    t: 'color';

    constructor(value: string, flag = true) {
        this.v = value;
        this.f = flag;
        this.t = 'color';
    }
}
