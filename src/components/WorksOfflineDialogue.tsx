import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface WorksOfflineDialogueProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function WorksOfflineDialogue(props: WorksOfflineDialogueProps) {
    const { t } = useTranslation(['service', 'core']);
    return <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>{t('service:available_offline.title')}</DialogTitle>
        <DialogContent>
            {t('service:available_offline.content')}
        </DialogContent>
        <DialogActions>
            <Button variant="text" onClick={() => props.setOpen(false)}>{t('core:ui.dismiss')}</Button>
        </DialogActions>
    </Dialog>
}