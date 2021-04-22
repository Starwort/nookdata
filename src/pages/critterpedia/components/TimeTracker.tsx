import { useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTextWidth } from '../../../misc';
import UserSettings from '../../../user_settings';
import './TimeTracker.scss';

interface TimeTrackerProps {
    hours: boolean[];
    time: Date;
    settings: UserSettings;
}

export default function TimeTracker(props: TimeTrackerProps) {
    const theme = useTheme();
    const { t } = useTranslation('core');
    let now = props.time;
    let progress = (
        (
            (
                now.getMilliseconds() / 1000
                + now.getSeconds()
            ) / 60
            + now.getMinutes()
        ) / 60
        + now.getHours()
    ) * 100 / 24;
    return <div
        className="time-tracker"
        style={{
            marginBottom: Math.max(
                getTextWidth(
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.am_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '0',
                            h12: 12,
                            h24: 0,
                            m: '00',
                        }
                    )
                ),
                getTextWidth(
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.pm_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '0',
                            h12: 12,
                            h24: 0,
                            m: '00',
                        }
                    )
                ),
            ) - 8,
        }}
    >
        <div
            className="now"
            style={{
                backgroundColor: theme.palette.error.main,
                '--progress': `${progress}%`,
            }}
        />
        <div>
            <div className="large-division" style={{ backgroundColor: theme.palette.text.primary }} />
            <div className="division-label">
                {
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.am_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '0',
                            h12: 12,
                            h24: 0,
                            m: '00',
                        }
                    )
                }
            </div>
        </div>
        <div className="hour" style={{ backgroundColor: props.hours[0] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[1] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[2] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[3] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[4] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[5] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div>
            <div className="medium-division" style={{ backgroundColor: theme.palette.text.primary }} />
            <div className="division-label">
                {
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.am_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '0',
                            h12: 6,
                            h24: 6,
                            m: '00',
                        }
                    )
                }
            </div>
        </div>
        <div className="hour" style={{ backgroundColor: props.hours[6] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[7] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[8] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[9] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[10] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[11] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div>
            <div className="large-division" style={{ backgroundColor: theme.palette.text.primary }} />
            <div className="division-label">
                {
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.pm_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '',
                            h12: 12,
                            h24: 12,
                            m: '00',
                        }
                    )
                }
            </div>
        </div>
        <div className="hour" style={{ backgroundColor: props.hours[12] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[13] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[14] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[15] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[16] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[17] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div>
            <div className="medium-division" style={{ backgroundColor: theme.palette.text.primary }} />
            <div className="division-label">
                {
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.pm_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '',
                            h12: 6,
                            h24: 18,
                            m: '00',
                        }
                    )
                }
            </div>
        </div>
        <div className="hour" style={{ backgroundColor: props.hours[18] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[19] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[20] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[21] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[22] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div className="small-division" style={{ backgroundColor: theme.palette.text.primary }} />
        <div className="hour" style={{ backgroundColor: props.hours[23] ? theme.palette.modelled.main : 'transparent', opacity: theme.palette.opacity }} />
        <div>
            <div className="large-division" style={{ backgroundColor: theme.palette.text.primary }} />
            <div className="division-label">
                {
                    t(
                        props.settings.useTwelveHourTime
                            ? 'core:time.twelve_hour.am_short'
                            : 'core:time.twenty_four_hour',
                        {
                            pad: '0',
                            h12: 12,
                            h24: 0,
                            m: '00',
                        }
                    )
                }
            </div>
        </div>
    </div>
}