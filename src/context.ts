import 'datejs';
import React, {useContext} from "react";
import {upgradeData, UserCritterpediaData, UserSettings, UserTurnipsData} from "./data";
import {DeepPartial, useRerender} from "./misc";

const defaultTime = new Date();
interface AllData {
    turnips: UserTurnipsData;
    critterpedia: UserCritterpediaData;
    settings: UserSettings;
}
interface DataContext {
    turnips: UserTurnipsData;
    critterpedia: UserCritterpediaData;
    settings: UserSettings;
    updateData(data: DeepPartial<AllData>): void;
}
export const TimeContext = React.createContext<Date>(defaultTime);
export const DataContext = React.createContext<DataContext>({} as DataContext);

interface ContextProviderProps {
    children: React.ReactElement[] | React.ReactNode;
}

interface TimeContextProps {
    interval?: number;
    offset: number;
}

export function TimeContextProvider({interval, offset, children}: TimeContextProps & ContextProviderProps) {
    const [time, setTime] = React.useState(defaultTime);
    React.useEffect(() => {
        let windowInterval = window.setInterval(() => setTime((new Date()).addMilliseconds(offset)), interval ?? 500);
        return () => {
            window.clearInterval(windowInterval);
        };
    }, [interval, offset]);
    return React.createElement(
        TimeContext.Provider,
        {value: time},
        children,
    );
}

export function DataContextProvider({children}: ContextProviderProps) {
    upgradeData(); // usually a no-op, prevents crash for new users
    const rerender = useRerender();
    let settings = JSON.parse(window.localStorage.settings) as UserSettings;
    let critterpedia = JSON.parse(window.localStorage.critterpedia) as UserCritterpediaData;
    let turnips = JSON.parse(window.localStorage.turnips) as UserTurnipsData;
    const updateData = React.useCallback((data: DeepPartial<AllData>) => {
        if (data.settings !== undefined) {
            settings = {...settings, ...data.settings};
        }
        if (data.critterpedia !== undefined) {
            if (data.critterpedia.bugs !== undefined) {
                for (let [index, newBugData] of Object.entries(data.critterpedia.bugs)) {
                    let bugData = critterpedia.bugs[+index];
                    Object.assign(bugData, newBugData);
                }
            }
            if (data.critterpedia.fish !== undefined) {
                for (let [index, newFishData] of Object.entries(data.critterpedia.fish)) {
                    let fishData = critterpedia.fish[+index];
                    Object.assign(fishData, newFishData);
                }
            }
        }
        if (data.turnips !== undefined) {
            if (data.turnips.buy !== undefined) {
                turnips.buy = data.turnips.buy;
            }
            if (data.turnips.previousPattern !== undefined) {
                turnips.previousPattern = data.turnips.previousPattern;
            }
            if (data.turnips.firstBuy !== undefined) {
                turnips.firstBuy = data.turnips.firstBuy;
            }
            for (let day of ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as (keyof UserTurnipsData)[]) {
                if (data.turnips[day] !== undefined) {
                    Object.assign(turnips[day], data.turnips[day]);
                }
            }
        }
        settings.dataLastUpdated = new Date().toISOString();
        window.localStorage.settings = JSON.stringify(settings);
        window.localStorage.critterpedia = JSON.stringify(critterpedia);
        window.localStorage.turnips = JSON.stringify(turnips);
        rerender();
    }, []);
    return React.createElement(
        DataContext.Provider,
        {value: {settings, critterpedia, turnips, updateData}},
        children,
    );
}
export function useTime() {
    return useContext(TimeContext);
}
export function useData() {
    return useContext(DataContext);
}
