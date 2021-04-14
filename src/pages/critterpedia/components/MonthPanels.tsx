import { Card, CardContent, Theme, useTheme } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import '../../../prototype_mods';
import UserSettings from '../../../user_settings';
import './CritterPanel.scss';
const months = [
    "critterpedia.dialogue.months.jan",
    "critterpedia.dialogue.months.feb",
    "critterpedia.dialogue.months.mar",
    "critterpedia.dialogue.months.apr",
    "critterpedia.dialogue.months.may",
    "critterpedia.dialogue.months.jun",
    "critterpedia.dialogue.months.jul",
    "critterpedia.dialogue.months.aug",
    "critterpedia.dialogue.months.sep",
    "critterpedia.dialogue.months.oct",
    "critterpedia.dialogue.months.nov",
    "critterpedia.dialogue.months.dec",
];
function winter(theme: Theme, settings: UserSettings) {
    return (
        settings.hemisphere === "north"
            ? theme.palette.winter
            : theme.palette.summer
    );
}
function spring(theme: Theme, settings: UserSettings) {
    return (
        settings.hemisphere === "north"
            ? theme.palette.spring
            : theme.palette.autumn
    );
}
function summer(theme: Theme, settings: UserSettings) {
    return (
        settings.hemisphere === "north"
            ? theme.palette.summer
            : theme.palette.winter
    );
}
function autumn(theme: Theme, settings: UserSettings) {
    return (
        settings.hemisphere === "north"
            ? theme.palette.autumn
            : theme.palette.spring
    );
}
const seasons = [
    winter,
    winter,
    spring,
    spring,
    spring,
    summer,
    summer,
    summer,
    autumn,
    autumn,
    autumn,
    winter,
];

interface MonthPanelProps {
    months: boolean[];
    month: number;
    active: boolean;
    settings: UserSettings;
}
function MonthPanel(props: MonthPanelProps) {
    const theme = useTheme();
    const { t, i18n } = useTranslation('critterpedia');
    return <td width="33%">
        <Card
            variant="outlined"
            style={{
                // backgroundColor: ((colour) => (
                //     props.months[props.month]
                //         ? colour.main
                //         : colour.transparent
                // ))(
                //     seasons[props.month](theme, props.settings)
                // ),
                backgroundColor: seasons[props.month](theme, props.settings).main,
                opacity: props.months[props.month] ? undefined : theme.palette.opacity,
                color: seasons[props.month](theme, props.settings).contrastText,
                borderColor: props.active ? theme.palette.error.main : 'transparent',
                borderWidth: 2,
                borderStyle: 'solid',
                margin: -1,
            }}
        >
            <CardContent style={{ paddingBottom: 16 }}>
                {t(months[props.month])}
            </CardContent>
        </Card>
    </td>
}
interface MonthPanelsProps {
    months: boolean[];
    activeMonth: number;
    settings: UserSettings;
}
export default function MonthPanels(props: MonthPanelsProps) {
    return <table style={{ width: '100%' }}>
        <tbody>
            <tr>
                <MonthPanel
                    months={props.months}
                    month={0}
                    active={props.activeMonth == 0}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={1}
                    active={props.activeMonth == 1}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={2}
                    active={props.activeMonth == 2}
                    settings={props.settings}
                />
            </tr>
            <tr>
                <MonthPanel
                    months={props.months}
                    month={3}
                    active={props.activeMonth == 3}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={4}
                    active={props.activeMonth == 4}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={5}
                    active={props.activeMonth == 5}
                    settings={props.settings}
                />
            </tr>
            <tr>
                <MonthPanel
                    months={props.months}
                    month={6}
                    active={props.activeMonth == 6}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={7}
                    active={props.activeMonth == 7}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={8}
                    active={props.activeMonth == 8}
                    settings={props.settings}
                />
            </tr>
            <tr>
                <MonthPanel
                    months={props.months}
                    month={9}
                    active={props.activeMonth == 9}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={10}
                    active={props.activeMonth == 10}
                    settings={props.settings}
                />
                <MonthPanel
                    months={props.months}
                    month={11}
                    active={props.activeMonth == 11}
                    settings={props.settings}
                />
            </tr>
        </tbody>
    </table >;
}