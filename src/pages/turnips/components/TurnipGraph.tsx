import { Card, CardContent, useTheme } from "@material-ui/core";
import { areaSplineRange } from 'billboard.js';
import React from "react";
import { Chart } from '.';
import { Dict } from "../../../misc";
import { calculate, dataMakesSense, Pattern, patternColours, UserTurnipsData } from "../data";


const patternNames = {
    [Pattern.FLUCTUATING]: "turnips:pattern.fluctuating",
    [Pattern.LARGE_SPIKE]: "turnips:pattern.large_spike",
    [Pattern.DECREASING]: "turnips:pattern.decreasing",
    [Pattern.SMALL_SPIKE]: "turnips:pattern.small_spike",
    [Pattern.AGGREGATE]: "turnips:pattern.aggregate",
    [Pattern.UNKNOWN]: "Something went wrong. Sorry.",
}

export default function TurnipGraph({ data }: { data: UserTurnipsData }) {
    const theme = useTheme();
    const result = React.useMemo(
        () => dataMakesSense(data) ? calculate(data) : [],
        [data]
    );
    if (!result.length) {
        return null;
    }
    let columns: [string, ...{ high: number, low: number, mid: number }[]][] = [];
    let colours: Dict<string> = {}
    let names: Dict<string> = {}
    let n = 0;
    for (let pattern of result) {
        let column: [string, ...{ high: number, low: number, mid: number }[]] = [`data${n}`];
        for (let hour of pattern.hours) {
            column.push({ low: hour.min, high: hour.max, mid: hour.avg });
        }
        columns.push(column);
        names[`data${n}`] = patternNames[pattern.pattern];
        colours[`data${n++}`] = patternColours[pattern.pattern](pattern.chance);
    }
    return <Card style={{ margin: 16 }}>
        <CardContent>
            <Chart
                isPure
                className={`chart ${theme.name}`}
                data={{
                    columns: columns as any,
                    colors: colours,
                    names,
                    type: areaSplineRange(),
                }}
                legend={{
                    // position: 'right',
                    show: false
                }}
            />
        </CardContent>
    </Card>;
}