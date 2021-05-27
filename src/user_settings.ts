import { ThemeName } from "./themes";

export default interface UserSettings {
    theme: ThemeName;
    hemisphere: "north" | "south";
    playerName: string;
    islandName: string;
    timeOffset: number;
    useSystemTime: boolean;
    useTwelveHourTime: boolean;
};