type Fn<T> = (arg: T) => unknown;

class Case<T, P = any> {
    constructor(
        private value: T,
        private result: unknown | null = null,
    ) {}

    case<U>(compareValue: T, result: Fn<U & T> | U): Case<T, P> {
        if (isPresent(this.result)) {
            return this;
        } else if (compareValue === this.value) {
            return handleResultAndGetCase(this.value, result);
        }
        return new Case(this.value);
    }

    default<D>(defaultValue?: D): any {
        if (isPresent(this.result)) {
            return this.result;
        }
        return defaultValue;
    }
}

function handleResultAndGetCase<T>(value: T, result: any): Case<T> {
    if (result instanceof Function) {
        return new Case(value, result(value));
    }
    return new Case(value, result);
}

function isPresent<T>(value: T): boolean {
    return value !== undefined && value !== null;
}

export default function match<T>(value: T): Case<T, T> {
    return new Case<any, T>(value);
}
