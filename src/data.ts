import {Pattern} from './pages/turnips/data';
import {ThemeName} from './themes';
export const VERSION = '0.1.0';

function _upgrade0() {
    if (!window.localStorage.settings) {
        window.localStorage.settings = JSON.stringify({
            theme: 'dark',
            hemisphere: 'north',
            islandName: 'ISLAND',
            playerName: 'PLAYER',
            timeOffset: 0,
            useSystemTime: true,
            useTwelveHourTime: false,
        });
    }
    if (!window.localStorage.critterpedia) {
        let data: UserCritterpediaData = {
            bugs: [],
            fish: [],
        };
        for (let i = 0; i < 80; i++) {
            data.bugs.push({obtained: false, modelled: false});
            data.fish.push({obtained: false, modelled: false});
        }
        window.localStorage.critterpedia = JSON.stringify(data);
    }
    if (!window.localStorage.turnips) {
        window.localStorage.turnips = JSON.stringify({
            buy: null,
            mon: {am: null, pm: null},
            tue: {am: null, pm: null},
            wed: {am: null, pm: null},
            thu: {am: null, pm: null},
            fri: {am: null, pm: null},
            sat: {am: null, pm: null},
            previousPattern: Pattern.UNKNOWN,
            firstBuy: false,
        });
    }
    window.localStorage.dataVersion = VERSION;
    _upgrade1();
}
function _upgrade1() {
    // latest version at time of writing
}

namespace Versions {
    export namespace PreNumber {
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

        export interface UserCritterData {
            obtained: boolean;
            modelled: boolean;
        }

        export interface UserCritterpediaData {
            bugs: UserCritterData[];
            fish: UserCritterData[];
        }

        export interface UserSettings {
            theme: ThemeName;
            hemisphere: "north" | "south";
            playerName: string;
            islandName: string;
            timeOffset: number;
            useSystemTime: boolean;
            useTwelveHourTime: boolean;
        }

        export const upgrade = _upgrade0;
    }
    export namespace ND_0_1_0 {
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

        export interface UserCritterData {
            obtained: boolean;
            modelled: boolean;
        }

        export interface UserCritterpediaData {
            bugs: UserCritterData[];
            fish: UserCritterData[];
        }

        export interface UserSettings {
            theme: ThemeName;
            hemisphere: "north" | "south";
            playerName: string;
            islandName: string;
            timeOffset: number;
            useSystemTime: boolean;
            useTwelveHourTime: boolean;
        }

        export const upgrade = _upgrade1;
    }
}
export type UserHourData = Versions.ND_0_1_0.UserHourData;
export type UserTurnipsData = Versions.ND_0_1_0.UserTurnipsData;
export type UserCritterData = Versions.ND_0_1_0.UserCritterData;
export type UserCritterpediaData = Versions.ND_0_1_0.UserCritterpediaData;
export type UserSettings = Versions.ND_0_1_0.UserSettings;
export function updateData() {
    if (window.localStorage.dataVersion === VERSION) {
        return;
    }
    switch (window.localStorage.dataVersion) {
        case undefined:
            Versions.PreNumber.upgrade();
            break;
        default:
            console.log("Please do not mess with your data!");
    }
};
