import { UserHourData, UserTurnipsData } from '../../data';
import { all, Filter, range, zip } from "../../misc";
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

interface TurnipsIntermediateResult {
    pattern: Filter<Pattern, Pattern.UNKNOWN>;
    chance: number;
    hours: number[][];
}

type FlatData = (number | null)[];

function intermediateToResult(result: TurnipsIntermediateResult): TurnipsResult {
    return {
        pattern: result.pattern,
        chance: result.chance,
        hours: result.hours.map(
            (points) => (
                {
                    min: Math.min(...points),
                    max: Math.max(...points),
                    avg: points.reduce((a, b) => a + b, 0) / points.length,
                }
            )
        )
    };
}

function aggregate(results: TurnipsIntermediateResult[]): TurnipsIntermediateResult {
    return {
        pattern: results.reduce((pattern, result) => result.pattern != pattern ? Pattern.AGGREGATE : result.pattern, results[0].pattern),
        chance: results.reduce((chance, pattern) => chance + pattern.chance, 0),
        hours: results.reduce(
            (hours: number[][], result): number[][] => hours.map(
                (prices, index) => [...prices, ...result.hours[index]]
            ),
            [[], [], [], [], [], [], [], [], [], [], [], []]
        ),
    };
}

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

function* calculateFluctuatingHigh(buy: number, data: FlatData, offset: number, length: number) {
    let range = makeRange(0.9, 1.4, buy);
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

function* calculateFluctuatingDec(buy: number, data: FlatData, offset: number, length: 2 | 3) {
    let prices = data.slice(offset, offset + length);
    let ranges: Range[] = [];
    let minRates = [0.6];
    let maxRates = [0.8];
    let recalculate = false;
    for (let i = 0; i < length; i++) {
        let price = prices[i]
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
        minRates.push(minRates[i] - 0.1);
        maxRates.push(maxRates[i] - 0.04);
    }
    if (recalculate) {
        // make sure previous values make sense
        for (let i = length - 2; i >= 0; i--) {
            if (minRates[i] < minRates[i + 1]) {
                minRates[i] = minRates[i + 1] + 0.04;  // increment it the smallest amount to be valid
                ranges[i].min = Math.ceil(minRates[i] * buy);
                ranges[i].avg = (minRates[i] + maxRates[i]) / 2 * buy;
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
        for (let phase1 of calculateFluctuatingHigh(buy, data, 1, hi1)) {
            for (let _dec1 of [2, 3]) {
                const dec1 = _dec1 as (2 | 3);
                const dec2 = 5 - dec1 as (2 | 3);
                for (let phase2 of calculateFluctuatingDec(buy, data, 1 + hi1, dec1)) {
                    for (let hi3 = 0; hi3 < hi23; hi3++) {
                        for (let phase3 of calculateFluctuatingHigh(buy, data, 1 + hi1 + dec1, hi23 - hi3)) {
                            for (let phase4 of calculateFluctuatingDec(buy, data, 8 + dec1 - hi3, dec2)) {
                                for (let phase5 of calculateFluctuatingHigh(buy, data, 13 - hi3, hi3)) {
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

function calculateFluctuating(categoryChance: number, data: FlatData) {
    if (data[0] !== null) {
        return [...calculateOneFluctuating(categoryChance, data[0], data)];
    }
    return range(90, 111).map(i => [...calculateOneFluctuating(categoryChance / 20, i, data)]).flat();
}

function calculateOneLargeSpike(categoryChance: number, data: FlatData) {
    //
    return [];
}

function calculateLargeSpike(categoryChance: number, data: FlatData) {
    //
    return [];
}

function calculateOneDecreasing(categoryChance: number, data: FlatData) {
    //
    return [];
}

function calculateDecreasing(categoryChance: number, data: FlatData) {
    //
    return [];
}

function calculateOneSmallSpike(categoryChance: number, data: FlatData) {
    //
    return [];
}

function calculateSmallSpike(categoryChance: number, data: FlatData) {
    //
    return [];
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
    return result;
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

export const patternColours = {
    [Pattern.AGGREGATE]: (chance: number) => `rgba(255, 255, 255, ${chance})`,
    [Pattern.FLUCTUATING]: (chance: number) => `rgba(255, 0, 0, ${chance})`,
    [Pattern.LARGE_SPIKE]: (chance: number) => `rgba(0, 255, 0, ${chance})`,
    [Pattern.DECREASING]: (chance: number) => `rgba(0, 255, 255, ${chance})`,
    [Pattern.SMALL_SPIKE]: (chance: number) => `rgba(127, 0, 255, ${chance})`,
    [Pattern.UNKNOWN]: (chance: number) => { throw new Error('wtf') },
}

