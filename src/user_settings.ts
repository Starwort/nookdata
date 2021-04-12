export default interface UserSettings {
    theme: "dark" | "light";
    hemisphere: "north" | "south";
    playerName: string;
    islandName: string;
    timeOffset: number;
    useSystemTime: boolean;
    useTwelveHourTime: boolean;
};