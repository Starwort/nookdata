import React, {useContext} from "react";
import UserSettings from "./user_settings";

const defaultSettings: UserSettings = {
    theme: 'dark',
    hemisphere: 'north',
    islandName: 'Gloverboia',
    playerName: 'Starwort',
    timeOffset: 0,
    useSystemTime: true,
    useTwelveHourTime: true,
};
const defaultTime = new Date();
export const SettingsContext = React.createContext<UserSettings>(defaultSettings);
export const TimeContext = React.createContext<Date>(defaultTime);

interface TimeContextProps {
    interval?: number;
    children: React.ReactNode;
}

export function TimeContextProvider({interval, children}: TimeContextProps) {
    const [time, setTime] = React.useState(defaultTime);
    React.useEffect(() => {
        let windowInterval = window.setInterval(() => setTime(new Date()), interval ?? 500);
        return () => {
            window.clearInterval(windowInterval);
        };
    }, [interval]);
    return React.createElement(
        TimeContext.Provider,
        {value: time},
        children,
    );
}

interface SettingsContextProps {
    settings: UserSettings;
    children: React.ReactElement[];
}

export function SettingsContextProvider({settings, children}: SettingsContextProps) {
    return React.createElement(
        SettingsContext.Provider,
        {value: settings},
        children,
    );
}
export function useTime() {
    return useContext(TimeContext);
}
export function useSettings() {
    return useContext(SettingsContext);
}
export function useNDContext() {
    return {time: useTime(), settings: useSettings()};
}
