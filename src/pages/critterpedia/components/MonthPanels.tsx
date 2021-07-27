import {Card, CardContent, Grid, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useData} from "../../../context";
import {UserSettings} from '../../../data';
import {months, range} from "../../../misc";
import '../../../prototype_mods';
import './MonthPanels.scss';

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
}
function MonthPanel(props: MonthPanelProps) {
    const theme = useTheme();
    const {t} = useTranslation('critterpedia');
    const {settings} = useData();
    const tooSmall = useMediaQuery(theme.breakpoints.down('xs'));
    return <Grid item xs={4}>
        <Card
            variant="outlined"
            style={{
                backgroundColor: seasons[props.month](theme, settings).main,
                opacity: props.months[props.month] ? undefined : theme.palette.opacity,
                color: seasons[props.month](theme, settings).contrastText,
                borderColor: props.active ? theme.palette.error.main : 'transparent',
            }}
            className="month-panel"
        >
            <CardContent style={{paddingBottom: 16}}>
                {t(months[props.month] + (tooSmall ? '.short' : '.long'))}
            </CardContent>
        </Card>
    </Grid>;
}
interface MonthPanelsProps {
    months: boolean[];
    activeMonth: number;
}
export default function MonthPanels(props: MonthPanelsProps) {
    return <Grid container>
        {range(12).map(i =>
            <MonthPanel
                key={i}
                months={props.months}
                month={i}
                active={props.activeMonth == i}
            />
        )}
    </Grid>;
}