import React, { useContext } from "react";
import UserSettings from "./user_settings";


interface INDContext {
    time: Date;
    settings: UserSettings;
};
const defaultSettings: INDContext = {
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
};
let interval: number | undefined;
export const NDContext = React.createContext<INDContext>(defaultSettings);
export class NDContextProvider extends React.PureComponent<{ interval?: number, settings: UserSettings, children: React.ReactNode }> {
    static defaultProps = {
        interval: 500,
    };

    interval: number;
    children: React.ReactNode;

    constructor({ interval, settings, children }: { interval?: number, settings: UserSettings, children: React.ReactNode }) {
        super({ interval, settings, children });
        this.interval = interval ? interval : NDContextProvider.defaultProps.interval;
        this.children = children;
        this.setState({
            time: new Date(),
            settings
        });
    }

    // start with the current time in state
    state = defaultSettings;

    componentDidMount() {
        // on mount, we set up a timer to update our cached time based on
        // the interval prop.
        interval = window.setInterval(this.updateTime, this.interval);
    }

    componentWillUnmount() {
        // don't forget to clean up after ourselves!
        if (interval) {
            window.clearInterval(interval);
        }
    }

    updateTime = () => {
        this.setState(() => ({
            time: new Date(),
        }));
    };

    render() {
        return React.createElement(
            NDContext.Provider,
            { value: this.state },
            this.children,
        )
    }
};

// export function NDContextProvider({ time, settings, children }: INDContext & { children: React.ReactElement[] }) {
//     const value = { time, settings };
//     return React.createElement(
//         NDContext.Provider,
//         { value },
//         children,
//     )
// }
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
