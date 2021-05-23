import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@material-ui/core';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import { Trans, useTranslation } from 'react-i18next';

const gitInfo = GitInfo();

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
                </a>
            </Trans>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>
                {t('core:ui.dismiss')}
            </Button>
        </DialogActions>
    </Dialog>
}