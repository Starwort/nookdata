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
                <span style={{ color: theme.palette.primary.main }}>
                    {{ gitRevision: gitInfo.commit.shortHash }}
                </span>
            </Trans>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>
                {t('core:button.dismiss')}
            </Button>
        </DialogActions>
    </Dialog>
}