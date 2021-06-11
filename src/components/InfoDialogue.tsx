import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import { Trans, useTranslation } from 'react-i18next';
import { Centred } from '.';

const gitInfo = GitInfo();

interface ContribInfoProps {
    name: string;
    avatarUrl: string;
    t: (key: string, props?: Object) => string;
}
function ContribInfo({ name, avatarUrl, t }: ContribInfoProps) {
    return <Tooltip
        title={t('core:info.contrib.tooltip', { name }) as string}
    >
        <ListItem
            style={{
                padding: "8px 32px"
            }}
            button
            component="a"
            href={`https://github.com/Starwort/nookdata_v2/commits?author=${name}`}
            target="_blank"
        >
            <ListItemAvatar>
                <Avatar alt={t('core:alt.avatar', { name })} src={avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={t(`core:info.contrib.${name.toLowerCase()}`)} />
        </ListItem>
    </Tooltip>;
}

interface InfoDialogueProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function InfoDialogue(props: InfoDialogueProps) {
    const { t } = useTranslation('core');
    const theme = useTheme();
    return <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>
            {t('core:info.title')}
        </DialogTitle>
        <DialogContent>
            <Trans i18nKey="core:info.description" t={t}>
                You are currently viewing NookData revision
                <a href={`https://github.com/Starwort/nookdata_v2/commit/${gitInfo.commit.hash}`} style={{ color: theme.palette.primary.main, textUnderlineOffset: 2 }}>
                    {{ gitRevision: gitInfo.commit.shortHash }}
                </a>.
            </Trans>
            <br />
            <br />
            <Centred>
                <Typography variant="subtitle1">{t('core:info.contrib.title')}</Typography>
            </Centred>
            <Centred>
                <Typography variant="subtitle2">{t('core:info.contrib.subtitle')}</Typography>
            </Centred>
        </DialogContent>
        <List>
            <ContribInfo name="Starwort" avatarUrl={"https://avatars.githubusercontent.com/u/16487249"} t={t} />
            <ContribInfo name="EloLeChan" avatarUrl={"https://avatars.githubusercontent.com/u/83836335"} t={t} />
        </List>
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>
                {t('core:ui.dismiss')}
            </Button>
        </DialogActions>
    </Dialog>
}