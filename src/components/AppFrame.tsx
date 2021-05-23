import { List, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { EmojiNature } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, DrawerAdjust, ListItemLink, NavigationDrawer } from '.';
import { Dict } from '../misc';

interface PageData {
    title: string;
    icon: React.ReactNode;
}
export const pageData: Dict<PageData> = {
    '/critterpedia': {
        title: 'core:pages.critterpedia',
        icon: <EmojiNature />,
    },
    // '/turnips': {
    //     title: 'core:pages.turnips',
    //     icon: <ShowChart />,
    // },
}

interface AppFrameProps {
    setTheme: (value: "dark" | "light") => void;
    theme: "dark" | "light";
    children: React.ReactNode;
}
let initialRenders = 10;
export default function AppFrame(props: AppFrameProps) {
    const theme = useTheme();
    const startOpen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    if (initialRenders) {
        console.log(initialRenders, startOpen)
        if (startOpen && !drawerOpen) {
            initialRenders = 0;
            setDrawerOpen(true);
        } else {
            initialRenders--;
        }
    }
    const { t } = useTranslation('core');
    return (
        <>
            <AppBar setTheme={props.setTheme} setDrawerOpen={setDrawerOpen} theme={props.theme} drawerOpen={drawerOpen} title={<Typography variant="h6">
                <div
                    style={{
                        color: theme.palette.winter.main,
                        display: 'inline'
                    }}>{t('title.a')}</div>
                <div
                    style={{
                        color: theme.palette.summer.main,
                        display: 'inline'
                    }}>{t('title.b')}</div>
            </Typography>} />
            <NavigationDrawer open={drawerOpen} setOpen={setDrawerOpen}>
                <List>
                    {Object.entries(pageData).map(([route, data]) => (
                        <ListItemLink to={route} icon={data.icon} primary={t(data.title)} />
                    ))}
                </List>
            </NavigationDrawer>
            <DrawerAdjust active={drawerOpen}>
                {props.children}
            </DrawerAdjust>
        </>
    );
}
