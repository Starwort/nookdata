import { EmojiNature, ShowChart } from '@material-ui/icons';
import React from 'react';
import { Dict } from '../misc';
import Critterpedia from './critterpedia';
import Turnips from './turnips';

export { Critterpedia };
export { Turnips };

interface PageData {
    title: string;
    icon: React.ReactNode;
}
export const pageData: Dict<PageData> = {
    '/critterpedia': {
        title: 'core:pages.critterpedia',
        icon: <EmojiNature />,
    },
    '/turnips': {
        title: 'core:pages.turnips',
        icon: <ShowChart />,
    },
}