import React, { useContext } from "react";
import UserSettings from "./user_settings";

interface INDContext {
    time: Date;
    settings: UserSettings;
};
let defaultSettings: INDContext = {
    time: new Date(),
    settings: {
        theme: 'dark',
        hemisphere: 'north',
        islandName: 'Gloverboia',
        playerName: 'Starwort',
        timeOffset: 0,
        useSystemTime: true,
        useTwelveHourTime: true,
    }
}
export const NDContext = React.createContext<INDContext>(defaultSettings);
export function NDContextProvider({ time, settings, children }: INDContext & { children: React.ReactElement[] }) {
    const value = { time, settings };
    return React.createElement(
        NDContext.Provider,
        { value },
        children,
    )
}
export function useTime() {
    const { time } = useContext(NDContext);
    return time;
}
export function useSettings() {
    const { settings } = useContext(NDContext);
    return settings;
}
export function useNDContext() {
    return useContext(NDContext);
}
