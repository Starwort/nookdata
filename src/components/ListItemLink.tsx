import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactNode;
    primary: string;
    to: string;
    exact?: boolean;
    onSelect?: () => void;
}
export default function ListItemLink({ icon, primary, to, exact, onSelect }: ListItemLinkProps) {
    const renderLink = React.useMemo(
        () => React.forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
            <NavLink to={to} ref={ref} {...itemProps} activeClassName="Mui-selected" exact={exact} />
        )),
        [to]
    );
    return <ListItem button component={renderLink} onClick={onSelect}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
    </ListItem>;
}
