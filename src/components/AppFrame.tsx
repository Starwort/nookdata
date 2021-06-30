import {Typography, useMediaQuery, useTheme} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, DrawerAdjust, NavigationDrawer} from '.';
import {ThemeName} from '../themes';
import InfoDialogue from './InfoDialogue';
import LanguageDialogue from './LanguageDialogue';


interface AppFrameProps {
    setTheme: (value: ThemeName) => void;
    children: React.ReactNode;
    updateReady: boolean;
    worksOffline: boolean;
    setWorksOffline: (value: boolean) => void;
}
let initialRenders = 10;
export default function AppFrame(props: AppFrameProps) {
    const theme = useTheme();
    const startOpen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    if (initialRenders) {
        console.log(initialRenders, startOpen);
        if (startOpen && !drawerOpen) {
            initialRenders = 0;
            setDrawerOpen(true);
        } else {
            initialRenders--;
        }
    }
    const {t, i18n} = useTranslation('core');
    const [langOpen, setLangOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    return (
        <>
            <AppBar
                setDrawerOpen={setDrawerOpen}
                drawerOpen={drawerOpen}
                title={
                    <Typography variant="h6">
                        <div
                            style={{
                                color: theme.palette.winter.main,
                                display: 'inline'
                            }}
                        >
                            {t('title.a')}
                        </div>
                        <div
                            style={{
                                color: theme.palette.summer.main,
                                display: 'inline'
                            }}
                        >
                            {t('title.b')}
                        </div>
                    </Typography>
                }
                updateReady={props.updateReady}
                worksOffline={props.worksOffline}
                setWorksOffline={props.setWorksOffline}
            />
            <NavigationDrawer
                open={drawerOpen}
                setOpen={setDrawerOpen}
                setTheme={props.setTheme}
                setInfoOpen={setInfoOpen}
                setLangOpen={setLangOpen}
            />
            <LanguageDialogue open={langOpen} setLang={(value: string) => {
                i18n.changeLanguage(value);
                setLangOpen(false);
            }} />
            <InfoDialogue open={infoOpen} setOpen={setInfoOpen} />
            <DrawerAdjust active={drawerOpen}>
                {props.children}
            </DrawerAdjust>
        </>
    );
}
