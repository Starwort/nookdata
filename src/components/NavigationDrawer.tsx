import {Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, SvgIcon, Toolbar, useTheme} from '@material-ui/core';
import {Info, Settings} from '@material-ui/icons';
import {useTranslation} from 'react-i18next';
import {ListItemLink} from '.';
import {ReactComponent as DiscordSVG} from '../assets/icons/discord.svg';
import {pageData} from '../pages';

function Discord() {
    return <SvgIcon component={DiscordSVG} />;
}

interface DrawerContentProps {
    onSelect?(): void;
    setInfoOpen(value: boolean): void;
    setSettingsOpen(value: boolean): void;
}
function DrawerContent({
    onSelect,
    setInfoOpen,
    setSettingsOpen: setSettingsOpen,
}: DrawerContentProps) {
    const {t} = useTranslation('core');
    return <>
        <List>
            {Object.entries(pageData).map(([route, data]) => (
                <ListItemLink key={route} to={route} icon={data.icon} primary={t(data.title)} onSelect={onSelect} />
            ))}
        </List>
        <div style={{flexGrow: 1}} />
        <ListItem button component="a" href="https://discord.gg/jahp5wd" target="_blank">
            <ListItemIcon>
                <Discord />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.support')} />
        </ListItem>
        <ListItem button onClick={() => {setInfoOpen(true); if (onSelect) {onSelect();} }}>
            <ListItemIcon>
                <Info />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.about')} />
        </ListItem>
        <ListItem button onClick={() => {setSettingsOpen(true); if (onSelect) {onSelect();} }}>
            <ListItemIcon>
                <Settings />
            </ListItemIcon>
            <ListItemText primary={t('core:sidebar.settings')} />
        </ListItem>
    </>;
}

interface NavigationDrawerProps {
    open: boolean;
    setOpen(value: boolean): void;
    setInfoOpen(value: boolean): void;
    setSettingsOpen(value: boolean): void;
}


export default function NavigationDrawer({open, setOpen, setInfoOpen, setSettingsOpen}: NavigationDrawerProps) {
    const theme = useTheme();
    const container = window !== undefined ? () => window.document.body : undefined;
    return <>
        <Hidden smUp>
            <Drawer
                variant="temporary"
                container={container}
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DrawerContent
                    onSelect={() => setOpen(false)}
                    setInfoOpen={setInfoOpen}
                    setSettingsOpen={setSettingsOpen}
                />
            </Drawer>
        </Hidden>
        <Hidden xsDown>
            <Drawer
                variant="persistent"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
            >
                <Toolbar />
                <DrawerContent
                    setInfoOpen={setInfoOpen}
                    setSettingsOpen={setSettingsOpen}
                />
            </Drawer>
        </Hidden>
    </>;
}
