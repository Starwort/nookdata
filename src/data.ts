import {Pattern} from './pages/turnips/data';
import {ThemeName} from './themes';


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

        export const upgrade = () => {
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
                let data: Versions.ND_0_1_0.UserCritterpediaData = {
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
            Versions.ND_0_1_0.upgrade();
        };
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

        export const upgrade = () => {
            let data: Versions.ND_0_2_0.UserCritterpediaData = JSON.parse(window.localStorage.critterpedia); // guaranteed to exist due to _upgrade0
            for (let i = 0; i < 80; i++) {
                data.bugs[i].stored = 0;
                data.fish[i].stored = 0;
            }
            window.localStorage.critterpedia = JSON.stringify(data);
            let settings: Versions.ND_0_2_0.UserSettings = JSON.parse(window.localStorage.settings);
            settings.dataLastUpdated = (new Date(0)).toISOString(); // always be the oldest data when converting
            settings.token = ''; // when updating, we don't have a token
            window.localStorage.settings = JSON.stringify(settings);
            Versions.ND_0_2_0.upgrade();
        };
    }
    export namespace ND_0_2_0 {
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
            stored: number;
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
            dataLastUpdated: string;
            token: string;
        }

        export const upgrade = () => {
            let settings: Versions.ND_0_2_1.UserSettings = JSON.parse(window.localStorage.settings);
            settings.turnipNoConfirm = false;
            window.localStorage.settings = JSON.stringify(settings);
            Versions.ND_0_2_1.upgrade();
        };
    }

    export namespace ND_0_2_1 {
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
            stored: number;
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
            dataLastUpdated: string;
            token: string;
            turnipNoConfirm: boolean;
        }

        export const upgrade = () => {
            // latest version at time of writing
        };
    }
}
export const DEFAULT_SETTINGS: UserSettings = {
    theme: 'dark',
    hemisphere: 'north',
    playerName: 'PLAYER',
    islandName: 'ISLAND',
    timeOffset: 0,
    useSystemTime: true,
    useTwelveHourTime: false,
    dataLastUpdated: (new Date(0)).toISOString(),
    token: '',
    turnipNoConfirm: false
};
export const VERSION = '0.2.1';
export type UserHourData = Versions.ND_0_2_1.UserHourData;
export type UserTurnipsData = Versions.ND_0_2_1.UserTurnipsData;
export type UserCritterData = Versions.ND_0_2_1.UserCritterData;
export type UserCritterpediaData = Versions.ND_0_2_1.UserCritterpediaData;
export type UserSettings = Versions.ND_0_2_1.UserSettings;
export function upgradeData() {
    switch (window.localStorage.dataVersion) {
        case 'undefined':
        case undefined:
            Versions.PreNumber.upgrade();
            break;
        case '0.1.0':
            Versions.ND_0_1_0.upgrade();
            break;
        case '0.2.0':
            Versions.ND_0_2_0.upgrade();
            break;
        case '0.2.1':
            Versions.ND_0_2_1.upgrade();
            break;
        default:
            console.log("Please do not mess with your data!");
    }
    window.localStorage.dataVersion = VERSION;
};
