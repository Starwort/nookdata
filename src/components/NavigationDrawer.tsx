import { Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme } from '@material-ui/core';
import { Feedback, Info, Language } from '@material-ui/icons';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import { useTranslation } from 'react-i18next';
import { ListItemLink } from '.';
import { pageData } from '../pages';
import { ThemeName } from '../themes';

interface DrawerContentProps {
    onSelect?: () => void;
    setTheme: (theme: ThemeName) => void;
    setInfoOpen: (value: boolean) => void;
    setLangOpen: (value: boolean) => void;
}
function DrawerContent({
    onSelect,
    setTheme,
    setInfoOpen,
    setLangOpen,
}: DrawerContentProps) {
    const { t } = useTranslation('core');
    const theme = useTheme();
    const newTheme: ThemeName = theme.name === 'dark' ? 'light' : 'dark';
    return <>
        <List>
            {Object.entries(pageData).map(([route, data]) => (
                <ListItemLink key={route} to={route} icon={data.icon} primary={t(data.title)} onSelect={onSelect} />
            ))}
        </List>
        <div style={{ flexGrow: 1 }} />
        <ListItem button component="a" href="https://discord.gg/jahp5wd" target="_blank">
            <ListItemIcon>
                <Feedback />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.support')} />
        </ListItem>
        <ListItem button onClick={() => { setInfoOpen(true); if (onSelect) { onSelect(); } }}>
            <ListItemIcon>
                <Info />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.about')} />
        </ListItem>
        <ListItem button onClick={() => { setLangOpen(true); if (onSelect) { onSelect(); } }}>
            <ListItemIcon>
                <Language />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.lang')} />
        </ListItem>
        <ListItem button onClick={() => { setTheme(newTheme); if (onSelect) { onSelect(); } }}>
            <ListItemIcon>
                {
                    newTheme === 'dark'
                        ? <DarkModeIcon />
                        : <LightModeIcon />
                }
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.theme')} />
        </ListItem>
    </>;
}

interface NavigationDrawerProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setTheme: (theme: ThemeName) => void;
    setInfoOpen: (value: boolean) => void;
    setLangOpen: (value: boolean) => void;
}


export default function NavigationDrawer(props: NavigationDrawerProps) {
    const theme = useTheme();
    const { t } = useTranslation('core');
    const container = window !== undefined ? () => window.document.body : undefined;
    return <>
        <Hidden smUp>
            <Drawer
                variant="temporary"
                container={container}
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.open}
                onClose={() => props.setOpen(false)}
            >
                <DrawerContent
                    onSelect={() => props.setOpen(false)}
                    setTheme={props.setTheme}
                    setInfoOpen={props.setInfoOpen}
                    setLangOpen={props.setLangOpen}
                />
            </Drawer>
        </Hidden>
        <Hidden xsDown>
            <Drawer
                variant="persistent"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.open}
            >
                <Toolbar />
                <DrawerContent
                    setTheme={props.setTheme}
                    setInfoOpen={props.setInfoOpen}
                    setLangOpen={props.setLangOpen}
                />
            </Drawer>
        </Hidden>
    </>;
}
