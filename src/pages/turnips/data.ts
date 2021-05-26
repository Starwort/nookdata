import { Filter, zip } from "../../misc";

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

export interface UserHourData {
    am: number | null;
    pm: number | null;
}

export interface UserTurnipsData {
    buy: number | null;
    mon: UserHourData;
    tue: UserHourData;
    wed: UserHourData;
    thu: UserHourData;
    fri: UserHourData;
    sat: UserHourData;
    previousPattern: Pattern;
    firstBuy: boolean;
}

export interface TurnipsResult {
    pattern: Filter<Pattern, Pattern.UNKNOWN>;
    chance: number;
    hours: { min: number, max: number, avg: number }[];
}

interface TurnipsIntermediateResult {
    pattern: Filter<Pattern, Pattern.UNKNOWN>;
    chance: number;
    hours: number[][];
}

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

function calculateOneFluctuating(categoryChance: number, data: UserTurnipsData) {
    return [];
}

function calculateFluctuating(categoryChance: number, data: UserTurnipsData) {
    if (data.buy !== null) {
        return [...calculateOneFluctuating(categoryChance, data)];
    }
    //
    return [];
}

function calculateOneLargeSpike(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function calculateLargeSpike(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function calculateOneDecreasing(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function calculateDecreasing(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function calculateOneSmallSpike(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function calculateSmallSpike(categoryChance: number, data: UserTurnipsData) {
    //
    return [];
}

function flattenData(data: UserTurnipsData): (number | null)[] {
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
        if (!user) {
            continue;
        }
        if (user < min || user > max) {
            return false;
        }
    }
    return true;
}

export function calculate(data: UserTurnipsData): TurnipsResult[] {
    let chanceFluctuating = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceLargeSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceDecreasing = CHANCE_FLUCTUATING[data.previousPattern];
    let chanceSmallSpike = CHANCE_FLUCTUATING[data.previousPattern];
    let result = [
        ...calculateFluctuating(chanceFluctuating, data),
        ...calculateLargeSpike(chanceLargeSpike, data),
        ...calculateDecreasing(chanceDecreasing, data),
        ...calculateSmallSpike(chanceSmallSpike, data),
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

export const PatternColours = {
    [Pattern.AGGREGATE]: (chance: number) => `rgba(255, 255, 255, ${chance})`,
    [Pattern.FLUCTUATING]: (chance: number) => `rgba(255, 0, 0, ${chance})`,
    [Pattern.LARGE_SPIKE]: (chance: number) => `rgba(0, 255, 0, ${chance})`,
    [Pattern.DECREASING]: (chance: number) => `rgba(0, 255, 255, ${chance})`,
    [Pattern.SMALL_SPIKE]: (chance: number) => `rgba(127, 0, 255, ${chance})`,
}

