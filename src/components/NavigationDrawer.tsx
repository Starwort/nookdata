import { Drawer, Hidden, Toolbar, useTheme } from '@material-ui/core';
import React from 'react';
interface NavigationDrawerProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    children: React.ReactNode;
}


function NavigationDrawer(props: NavigationDrawerProps) {
    const theme = useTheme();
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
                {props.children}
            </Drawer>
        </Hidden>
        <Hidden xsDown>
            <Drawer
                variant="persistent"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.open}
            >
                <Toolbar />
                {props.children}
            </Drawer>
        </Hidden>
    </>;
}
export default NavigationDrawer;
