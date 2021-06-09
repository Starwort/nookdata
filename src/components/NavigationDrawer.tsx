import { Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme } from '@material-ui/core';
import { Info, Language } from '@material-ui/icons';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import { useTranslation } from 'react-i18next';
import { ListItemLink } from '.';
import { pageData } from '../pages';
import { ThemeName } from '../themes';

interface NavigationDrawerProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setTheme: (theme: ThemeName) => void;
    setInfoOpen: (value: boolean) => void;
    setLangOpen: (value: boolean) => void;
}


function NavigationDrawer(props: NavigationDrawerProps) {
    const theme = useTheme();
    const { t } = useTranslation('core');
    const container = window !== undefined ? () => window.document.body : undefined;
    const newTheme: ThemeName = theme.name === 'dark' ? 'light' : 'dark';
    return <>
        <Hidden smUp>
            <Drawer
                variant="temporary"
                container={container}
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.open}
                onClose={() => props.setOpen(false)}
            >
                <List>
                    {Object.entries(pageData).map(([route, data]) => (
                        <ListItemLink key={route} to={route} icon={data.icon} primary={t(data.title)} onSelect={() => props.setOpen(false)} />
                    ))}
                </List>
                <div style={{ flexGrow: 1 }} />
                <ListItem button onClick={() => { props.setInfoOpen(true); props.setOpen(false); }}>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.about')} />
                </ListItem>
                <ListItem button onClick={() => { props.setLangOpen(true); props.setOpen(false); }}>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.lang')} />
                </ListItem>
                <ListItem button onClick={() => { props.setTheme(newTheme); props.setOpen(false); }}>
                    <ListItemIcon>
                        {
                            newTheme === 'dark'
                                ? <DarkModeIcon />
                                : <LightModeIcon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.theme')} />
                </ListItem>
            </Drawer>
        </Hidden>
        <Hidden xsDown>
            <Drawer
                variant="persistent"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.open}
            >
                <Toolbar />
                <List>
                    {Object.entries(pageData).map(([route, data]) => (
                        <ListItemLink key={route} to={route} icon={data.icon} primary={t(data.title)} />
                    ))}
                </List>
                <div style={{ flexGrow: 1 }} />
                <ListItem button onClick={() => props.setInfoOpen(true)}>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.about')} />
                </ListItem>
                <ListItem button onClick={() => props.setLangOpen(true)}>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.lang')} />
                </ListItem>
                <ListItem button onClick={() => props.setTheme(newTheme)}>
                    <ListItemIcon>
                        {
                            newTheme === 'dark'
                                ? <DarkModeIcon />
                                : <LightModeIcon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.theme')} />
                </ListItem>
            </Drawer>
        </Hidden>
    </>;
}
export default NavigationDrawer;
