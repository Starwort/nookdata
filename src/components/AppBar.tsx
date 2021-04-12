import { AppBar as TopAppBar, IconButton, Toolbar } from '@material-ui/core';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';


interface AppBarProps {
    setTheme: (value: "dark" | "light") => void,
    theme: 'dark' | 'light',
    setDrawerOpen: (value: boolean) => void,
    drawerOpen: boolean,
    title: React.ReactNode,
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
                    {props.theme == 'light'
                        ? <IconButton color="inherit" onClick={
                            () => {
                                window.localStorage.theme = 'dark';
                                props.setTheme('dark')
                            }}><DarkModeIcon /></IconButton>
                        : <IconButton color="inherit" onClick={
                            () => {
                                window.localStorage.theme = 'light';
                                props.setTheme('light')
                            }}><LightModeIcon /></IconButton>}
                </Toolbar>
            </TopAppBar>
            <Toolbar />
        </>
    )
}
export default AppBar;
