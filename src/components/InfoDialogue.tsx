import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import { useTranslation } from 'react-i18next';

const gitInfo = GitInfo();

interface InfoDialogueProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function InfoDialogue(props: InfoDialogueProps) {
    const { t } = useTranslation('core');
    return <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>
            {t('core:info.title')}
        </DialogTitle>
        <DialogContent>
            {t('core:info.description', { gitRevision: gitInfo.commit.shortHash })}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>
                {t('core:button.dismiss')}
            </Button>
        </DialogActions>
    </Dialog>
}