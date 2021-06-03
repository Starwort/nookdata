import { UserHourData, UserTurnipsData } from '../../data';
import { all, Filter, fsum, range, zip } from "../../misc";
import { ThemeName } from '../../themes';
export type { UserHourData, UserTurnipsData };

export enum Pattern {
    FLUCTUATING,
    LARGE_SPIKE,
    DECREASING,
    SMALL_SPIKE,
    UNKNOWN,
    AGGREGATE,
}

type PatternDictionary = {
    [K in Pattern]: number;
};

export interface Range {
    min: number;
    max: number;
    avg: number;
}

export interface TurnipsResult {
    pattern: Filter<Pattern, Pattern.UNKNOWN>;
    chance: number;
    hours: Range[];
}

function makeRange(min: number, max: number, base: number) {
    let avg = (min + max) / 2 * base + 0.5;  // just trust me, this should be right
    min = Math.ceil(min * base);
    max = Math.ceil(max * base);
    return { min, max, avg };
}

function rangeValid(range: Range, value: number | null) {
    return (value === null) || (range.min <= value && value <= range.max);
}

type FlatData = (number | null)[];

const CHANCE_FLUCTUATING: PatternDictionary = {
    [Pattern.FLUCTUATING]: 0.2,
    [Pattern.LARGE_SPIKE]: 0.5,
    [Pattern.DECREASING]: 0.25,
    [Pattern.SMALL_SPIKE]: 0.45,
    [Pattern.UNKNOWN]: 0.25,
    [Pattern.AGGREGATE]: 0.25,
};

const CHANCE_LARGE_SPIKE: PatternDictionary = {
    [Pattern.FLUCTUATING]: 0.3,
    [Pattern.LARGE_SPIKE]: 0.05,
    [Pattern.DECREASING]: 0.45,
    [Pattern.SMALL_SPIKE]: 0.25,
    [Pattern.UNKNOWN]: 0.25,
    [Pattern.AGGREGATE]: 0.25,
};

const CHANCE_DECREASING: PatternDictionary = {
    [Pattern.FLUCTUATING]: 0.15,
    [Pattern.LARGE_SPIKE]: 0.2,
    [Pattern.DECREASING]: 0.05,
    [Pattern.SMALL_SPIKE]: 0.15,
    [Pattern.UNKNOWN]: 0.25,
    [Pattern.AGGREGATE]: 0.25,
};

const CHANCE_SMALL_SPIKE: PatternDictionary = {
    [Pattern.FLUCTUATING]: 0.35,
    [Pattern.LARGE_SPIKE]: 0.25,
    [Pattern.DECREASING]: 0.25,
    [Pattern.SMALL_SPIKE]: 0.15,
    [Pattern.UNKNOWN]: 0.25,
    [Pattern.AGGREGATE]: 0.25,
};

function* calculateFluctuatingPeriod(buy: number, data: FlatData, offset: number, length: number, minRate: number, maxRate: number) {
    let range = makeRange(minRate, maxRate, buy);
    let prices = data.slice(offset, offset + length);
    if (!all(prices.map((price) => (rangeValid(range, price))))) {
        return;
    }
    yield prices.map((price) => (price ? { min: price, max: price, avg: price } : range));
}

function lowestRate(buy: number, price: number) {
    return (price - 1) / buy;
}
function highestRate(buy: number, price: number) {
    return price / buy;
}

function* calculateDecreasingPeriod(
    buy: number,
    data: FlatData,
    offset: number,
    length: number,
    minRate: number,
    maxRate: number,
    minDecay: number,
    maxDecay: number
) {
    let prices = data.slice(offset, offset + length);
    let ranges: Range[] = [];
    let minRates = [minRate];
    let maxRates = [maxRate];
    let recalculate = false;
    for (let i = 0; i < length; i++) {
        let price = prices[i];
        if (price) {
            let minRate = lowestRate(buy, price);
            let maxRate = highestRate(buy, price);
            if (maxRate < minRates[i] || minRate > maxRates[i]) {
                return;  // impossible pattern
            }
            ranges.push({ min: price, max: price, avg: price });
            minRates[i] = minRate;
            maxRates[i] = maxRate;
            recalculate = true;  // need to ensure previous values make sense
        } else {
            ranges.push(makeRange(minRates[i], maxRates[i], buy));
        }
        minRates.push(minRates[i] - maxDecay);
        maxRates.push(maxRates[i] - minDecay);
    }
    if (recalculate) {
        // make sure previous values make sense
        for (let i = length - 2; i >= 0; i--) {
            if (minRates[i] < minRates[i + 1]) {
                minRates[i] = minRates[i + 1] + minDecay;  // increment it the smallest amount to be valid
                ranges[i].min = Math.ceil(minRates[i] * buy);
                ranges[i].avg = (minRates[i] + maxRates[i]) / 2 * buy + 0.5;
            }
        }
    }
    yield ranges;
}

function* calculateOneFluctuating(categoryChance: number, buy: number, data: FlatData) {
    // generator abuse!!!!
    const chance = categoryChance / (
        7 // hi1 and hi23
        * 2 // dec1 and dec2
    )
    for (let hi1 = 0; hi1 <= 6; hi1++) {
        const hi23 = 7 - hi1;
        for (let phase1 of calculateFluctuatingPeriod(buy, data, 1, hi1, 0.9, 1.4)) {
            for (let dec1 of [2, 3]) {
                const dec2 = 5 - dec1;
                for (let phase2 of calculateDecreasingPeriod(buy, data, 1 + hi1, dec1, 0.6, 0.8, 0.04, 0.1)) {
                    for (let hi3 = 0; hi3 < hi23; hi3++) {
                        for (let phase3 of calculateFluctuatingPeriod(buy, data, 1 + hi1 + dec1, hi23 - hi3, 0.9, 1.4)) {
                            for (let phase4 of calculateDecreasingPeriod(buy, data, 8 + dec1 - hi3, dec2, 0.6, 0.8, 0.04, 0.1)) {
                                for (let phase5 of calculateFluctuatingPeriod(buy, data, 13 - hi3, hi3, 0.9, 1.4)) {
                                    yield {
                                        pattern: Pattern.FLUCTUATING,
                                        chance: chance / hi23,
                                        hours: [{ min: buy, max: buy, avg: buy }, ...phase1, ...phase2, ...phase3, ...phase4, ...phase5]
                                    };
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function* calculateFluctuating(categoryChance: number, data: FlatData) {
    if (data[0] !== null) {
        yield* calculateOneFluctuating(categoryChance, data[0], data);
    } else {
        for (let i = 90; i <= 110; i++) {
            yield* calculateOneFluctuating(categoryChance / 21, i, data);
        }
    }
}

function* calculateOneLargeSpike(categoryChance: number, buy: number, data: FlatData) {
    //
}

function* calculateLargeSpike(categoryChance: number, data: FlatData) {
    if (data[0] !== null) {
        yield* calculateOneLargeSpike(categoryChance, data[0], data);
    } else {
        for (let i = 90; i <= 110; i++) {
            yield* calculateOneLargeSpike(categoryChance / 21, i, data);
        }
    }
}

function* calculateOneDecreasing(categoryChance: number, buy: number, data: FlatData) {
    for (let hours of calculateDecreasingPeriod(buy, data, 1, 12, 0.85, 0.9, 0.03, 0.05)) {
        yield {
            pattern: Pattern.DECREASING,
            chance: categoryChance,
            hours: [{ rawMin: buy, rawMax: buy, min: buy, max: buy, avg: buy }, ...hours]
        }
    }
}

function* calculateDecreasing(categoryChance: number, data: FlatData) {
    if (data[0] !== null) {
        yield* calculateOneDecreasing(categoryChance, data[0], data);
    } else {
        for (let i = 90; i <= 110; i++) {
            yield* calculateOneDecreasing(categoryChance / 21, i, data);
        }
    }
}

function* calculateOneSmallSpike(categoryChance: number, buy: number, data: FlatData) {
    //
}

function* calculateSmallSpike(categoryChance: number, data: FlatData) {
    if (data[0] !== null) {
        yield* calculateOneSmallSpike(categoryChance, data[0], data);
    } else {
        for (let i = 90; i <= 110; i++) {
            yield* calculateOneSmallSpike(categoryChance / 20, i, data);
        }
    }
}

function flattenData(data: UserTurnipsData): FlatData {
    return [
        data.buy,
        data.mon.am,
        data.mon.pm,
        data.tue.am,
        data.tue.pm,
        data.wed.am,
        data.wed.pm,
        data.thu.am,
        data.thu.pm,
        data.fri.am,
        data.fri.pm,
        data.sat.am,
        data.sat.pm,
    ];
}
const minPossibleData = [90, 36, 32, 27, 23, 18, 14, 9, 27, 23, 18, 14, 9];
const maxPossibleData = [110, 154, 154, 220, 660, 660, 660, 660, 660, 660, 660, 220, 219];
export function dataMakesSense(data: UserTurnipsData): boolean {
    for (let [min, max, user] of zip(minPossibleData, maxPossibleData, flattenData(data))) {
        if (user === null) {
            continue;
        }
        if (user < min || user > max) {
            return false;
        }
    }
    return true;
}

const minChance = 0.001;  // ignore anything < 0.1%

interface AggregateIntermediateResult {
    min: number;
    max: number;
    sum: number;
}

function postProcess(result: TurnipsResult[]) {
    let totalProbability = fsum(result.map(i => i.chance));
    let newResult = result.map(i => ({ ...i, chance: i.chance / totalProbability }));
    let aggregate = newResult.reduce((aggregate: AggregateIntermediateResult[], value: TurnipsResult) => {
        console.log(aggregate, value);
        let result: AggregateIntermediateResult[] = [];
        for (let [aggregateHour, resultHour] of zip(aggregate, value.hours)) {
            result.push({
                min: Math.min(aggregateHour.min, resultHour.min),
                max: Math.max(aggregateHour.max, resultHour.max),
                sum: aggregateHour.sum + resultHour.avg * value.chance,
            })
        }
        return result;
    }, range(13).map(i => ({ min: Infinity, max: 0, sum: 0 })));
    newResult.push({
        pattern: Pattern.AGGREGATE,
        chance: 1,
        hours: aggregate.map(({ min, max, sum }) => ({ min, max, avg: sum, rawMin: 0, rawMax: 0 })),
    });
    newResult = newResult.filter(i => i.chance > minChance);
    return newResult;
}

export function calculate(data: UserTurnipsData): TurnipsResult[] {
    if (!dataMakesSense(data)) {
        return [];
    }
    let chanceFluctuating = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceLargeSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceDecreasing = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceSmallSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let flatData = flattenData(data);
    let result = [
        ...calculateFluctuating(chanceFluctuating, flatData),
        ...calculateLargeSpike(chanceLargeSpike, flatData),
        ...calculateDecreasing(chanceDecreasing, flatData),
        ...calculateSmallSpike(chanceSmallSpike, flatData),
    ]
    // result.push(aggregate(result));
    return postProcess(result);
    // return result;
}

export function knownPattern(data: UserTurnipsData): Pattern {
    if (!dataMakesSense(data)) {
        return Pattern.UNKNOWN;
    }
    let chanceFluctuating = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceLargeSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceDecreasing = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceSmallSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let flatData = flattenData(data);
    const isFluctuating = !calculateFluctuating(chanceFluctuating, flatData).next().done;
    const isLargeSpike = !calculateLargeSpike(chanceLargeSpike, flatData).next().done;
    const isDecreasing = !calculateDecreasing(chanceDecreasing, flatData).next().done;
    const isSmallSpike = !calculateSmallSpike(chanceSmallSpike, flatData).next().done;
    switch ([isFluctuating, isLargeSpike, isDecreasing, isSmallSpike]) {
        case [true, false, false, false]:
            return Pattern.FLUCTUATING;
        case [false, true, false, false]:
            return Pattern.LARGE_SPIKE;
        case [false, false, true, false]:
            return Pattern.DECREASING;
        case [false, false, false, true]:
            return Pattern.SMALL_SPIKE;
        default:
            return Pattern.UNKNOWN;
    }
}

export const emptyWeek: UserTurnipsData = {
    buy: null,
    mon: { am: null, pm: null },
    tue: { am: null, pm: null },
    wed: { am: null, pm: null },
    thu: { am: null, pm: null },
    fri: { am: null, pm: null },
    sat: { am: null, pm: null },
    previousPattern: Pattern.UNKNOWN,
    firstBuy: false,
};

export const patternColours: {
    [K in ThemeName]: {
        [K in Pattern]: (chance: number) => string;
    }
} = {
    dark: {
        [Pattern.AGGREGATE]: (chance: number) => `rgba(255, 255, 255, ${chance})`,
        [Pattern.FLUCTUATING]: (chance: number) => `rgba(255, 0, 0, ${chance})`,
        [Pattern.LARGE_SPIKE]: (chance: number) => `rgba(0, 255, 0, ${chance})`,
        [Pattern.DECREASING]: (chance: number) => `rgba(0, 255, 255, ${chance})`,
        [Pattern.SMALL_SPIKE]: (chance: number) => `rgba(127, 0, 255, ${chance})`,
        [Pattern.UNKNOWN]: (chance: number) => { throw new Error('wtf') },
    },
    light: {
        [Pattern.AGGREGATE]: (chance: number) => `rgba(0, 0, 0, ${chance})`,
        [Pattern.FLUCTUATING]: (chance: number) => `rgba(255, 0, 0, ${chance})`,
        [Pattern.LARGE_SPIKE]: (chance: number) => `rgba(0, 255, 0, ${chance})`,
        [Pattern.DECREASING]: (chance: number) => `rgba(0, 255, 255, ${chance})`,
        [Pattern.SMALL_SPIKE]: (chance: number) => `rgba(127, 0, 255, ${chance})`,
        [Pattern.UNKNOWN]: (chance: number) => { throw new Error('wtf') },
    },
}

