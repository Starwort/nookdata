import { AppBar as TopAppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import UpdateReadyIcon from './UpdateReadyIcon';
import WorksOfflineIcon from './WorksOfflineIcon';


interface AppBarProps {
    setDrawerOpen: (value: boolean) => void;
    drawerOpen: boolean;
    title: React.ReactNode;
    updateReady: boolean;
    worksOffline: boolean;
    setWorksOffline: (value: boolean) => void;
}

function AppBar(props: AppBarProps) {
    return (
        <>
            <TopAppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu"
                        style={{ marginRight: 16 }}
                        onClick={() => props.setDrawerOpen(!props.drawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1 }}>
                        {props.title}
                    </div>
                    {props.updateReady && <UpdateReadyIcon />}
                    {props.worksOffline && <WorksOfflineIcon setStatus={props.setWorksOffline} />}
                </Toolbar>
            </TopAppBar>
            <Toolbar />
        </>
    )
}
export default AppBar;
