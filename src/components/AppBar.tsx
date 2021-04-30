import { AppBar as TopAppBar, IconButton, Toolbar } from '@material-ui/core';
import { Info, Language } from '@material-ui/icons';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoDialogue from './InfoDialogue';
import LanguageDialogue from './LanguageDialogue';


interface AppBarProps {
    setTheme: (value: "dark" | "light") => void,
    theme: 'dark' | 'light',
    setDrawerOpen: (value: boolean) => void,
    drawerOpen: boolean,
    title: React.ReactNode,
}

function AppBar(props: AppBarProps) {
    const { t, i18n } = useTranslation('core');
    const [langOpen, setLangOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
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
                    <IconButton color="inherit" onClick={() => setInfoOpen(true)}>
                        <Info />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => setLangOpen(true)}>
                        <Language />
                    </IconButton>
                    {props.theme == 'light'
                        ? <IconButton
                            color="inherit"
                            onClick={
                                () => {
                                    window.localStorage.theme = 'dark';
                                    props.setTheme('dark')
                                }
                            }><DarkModeIcon /></IconButton>
                        : <IconButton
                            color="inherit"
                            onClick={
                                () => {
                                    window.localStorage.theme = 'light';
                                    props.setTheme('light')
                                }
                            }><LightModeIcon /></IconButton>}
                </Toolbar>
            </TopAppBar>
            <Toolbar />
            <LanguageDialogue open={langOpen} setLang={(value: string) => {
                i18n.changeLanguage(value);
                setLangOpen(false);
            }} />
            <InfoDialogue open={infoOpen} setOpen={setInfoOpen} />
        </>
    )
}
export default AppBar;
