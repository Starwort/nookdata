import {AppBar as TopAppBar, IconButton, Toolbar, useMediaQuery, useTheme} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useData, useTime} from '../context';
import {formatDate} from '../misc';
import UpdateReadyIcon from './dialogues/UpdateReadyIcon';
import WorksOfflineIcon from './dialogues/WorksOfflineIcon';


interface AppBarProps {
    setDrawerOpen: (value: boolean) => void;
    drawerOpen: boolean;
    title: React.ReactNode;
    updateReady: boolean;
    worksOffline: boolean;
    setWorksOffline: (value: boolean) => void;
}

function AppBar(props: AppBarProps) {
    const time = useTime();
    const {t} = useTranslation('core');
    const {settings} = useData();
    const theme = useTheme();
    const longhand = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>
            <TopAppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu"
                        style={{marginRight: 16}}
                        onClick={() => props.setDrawerOpen(!props.drawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{flexGrow: 1}}>
                        {props.title}
                    </div>
                    {props.updateReady && <UpdateReadyIcon />}
                    {props.worksOffline && <WorksOfflineIcon setStatus={props.setWorksOffline} />}
                    {formatDate(time, t, {longhand, includeTime: true, includeYear: true}, {twelveHour: settings.useTwelveHourTime, precision: 'second'})}
                </Toolbar>
            </TopAppBar>
            <Toolbar />
        </>
    );
}
export default AppBar;
