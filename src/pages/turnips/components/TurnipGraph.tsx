import { Card, CardContent, useTheme } from "@material-ui/core";
import { areaSplineRange } from 'billboard.js';
import React from "react";
import { useTranslation } from "react-i18next";
import { Chart } from '.';
import { Dict } from "../../../misc";
import { calculate, dataMakesSense, Pattern, patternColours, UserTurnipsData } from "../data";


const patternNames = {
    [Pattern.FLUCTUATING]: "turnips:graph.fluctuating",
    [Pattern.LARGE_SPIKE]: "turnips:graph.large_spike",
    [Pattern.DECREASING]: "turnips:graph.decreasing",
    [Pattern.SMALL_SPIKE]: "turnips:graph.small_spike",
    [Pattern.AGGREGATE]: "turnips:graph.aggregate",
    [Pattern.UNKNOWN]: "Something went wrong. Sorry.",
}

export default function TurnipGraph({ data }: { data: UserTurnipsData }) {
    const theme = useTheme();
    const { t } = useTranslation(['core', 'turnips']);
    const result = React.useMemo(
        () => dataMakesSense(data) ? calculate(data) : [],
        [data]
    );
    if (!result.length) {
        return null;
    }
    let columns: [string, ...{ high: number, low: number, mid: number }[]][] = [
        [
            "x",
            t('turnips:graph.buy'),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.mon.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.mon.short`) }),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.tue.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.tue.short`) }),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.wed.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.wed.short`) }),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.thu.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.thu.short`) }),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.fri.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.fri.short`) }),
            t('core:time.meridian.am.short_day', { day: t(`core:time.weekday.sat.short`) }),
            t('core:time.meridian.pm.short_day', { day: t(`core:time.weekday.sat.short`) }),
        ] as any
    ];
    let colours: Dict<string> = {}
    let names: Dict<string> = {}
    let n = 0;
    for (let pattern of result) {
        let column: [string, ...{ high: number, low: number, mid: number }[]] = [`data${n}`];
        for (let hour of pattern.hours) {
            column.push({ low: hour.min, high: hour.max, mid: hour.avg });
        }
        columns.push(column);
        names[`data${n}`] = t(patternNames[pattern.pattern], { patternChance: pattern.chance * 100 });
        colours[`data${n++}`] = patternColours[theme.name][pattern.pattern](pattern.chance);
    }
    return <Card style={{ margin: 16 }}>
        <CardContent>
            <Chart
                key={theme.name} // this is very hacky but if I don't do it switching theme completely breaks the graph
                isPure
                className={`chart ${theme.name}`}
                data={{
                    x: 'x',
                    columns: columns as any,
                    colors: colours,
                    names,
                    type: areaSplineRange(),
                }}
                legend={{
                    // position: 'right',
                    show: false
                }}
                axis={{
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 90,
                            multiline: false,
                            tooltip: true,
                        },
                    }
                }}
            />
        </CardContent>
    </Card>;
}