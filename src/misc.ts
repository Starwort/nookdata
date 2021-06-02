export type Dict<V> = {
    [key: string]: V;
}
var _getTextWidthDiv: HTMLDivElement;
function setUpDiv() {
    _getTextWidthDiv = document.createElement("div");
    _getTextWidthDiv.style.position = 'absolute';
    _getTextWidthDiv.style.top = '-9999px';
    _getTextWidthDiv.style.left = '-9999px';
    // _getTextWidthDiv.ariaHidden = true;
    document.body.appendChild(_getTextWidthDiv);
    return _getTextWidthDiv;
}
export function getTextWidth(text: string) {
    var div = _getTextWidthDiv ?? (setUpDiv());
    div.innerText = text
    return div.clientWidth;
}

export const root = '/nookdata_v2';
export function getDefault<T>(data: string | undefined, defaultValue: T) {
    if (data !== undefined) {
        return JSON.parse(data) as T;  // todo: figure out how to type-check this
    } else {
        return defaultValue;
    }
}
export function valueOr(data: String | undefined, defaultValue: number) {
    let rv = data ? +data : defaultValue;
    if (!isNaN(rv)) {
        return rv;
    } else {
        return defaultValue;
    }
}
export function booleanOr(data: String | undefined, defaultValue: boolean) {
    switch (data) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return defaultValue;
    }
}

export function range(start: number, stop: number | undefined = undefined, step: number = 1): Array<number> {
    if (stop === undefined) {
        stop = start;
        start = 0;
        if (step == 1) {  // benefit from optimisation where I don't use two-arg range
            return Array.from(Array(stop).keys());
        }
    }
    return Array(
        Math.ceil((stop! - start) / step)
    ).fill(start).map((x, y) => x + y * step);
}

export function all(values: boolean[]) {
    return values.reduce((res, valid) => (res && valid), true);
}
export function any(values: boolean[]) {
    return values.reduce((res, valid) => (res || valid), false);
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
export type Tuple<T extends unknown[]> = [...T];
export type SoA<T extends unknown[]> = { [I in keyof T]: T[I][] };
export function* zip<T extends unknown[]>(...arrays: SoA<T>) {
    if (arrays.length < 1) {
        return;
    }
    for (let i = 0; i < arrays.reduce((minLength, nextArr) => {
        let len = nextArr.length;
        return Math.min(minLength, len);
    }, Infinity); i++) {
        yield arrays.map((arr) => arr[i]) as Tuple<T>;
    }
}

export type Filter<T, V> = {
    [P in keyof T]: T[P] extends V ? never : T[P];
}
