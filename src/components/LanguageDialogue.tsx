import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface LanguageDialogueProps {
    open: boolean;
    setLang: (lang: string) => void;
}

export default function LanguageDialogue(props: LanguageDialogueProps) {
    const { t } = useTranslation('core');
    return <Dialog aria-labelledby="lang-dialogue-title" open={props.open} PaperProps={{ style: { width: 250 } }}>
        <DialogTitle style={{ textAlign: 'center' }} id="lang-dialogue-title">{t('core:lang.choose')}</DialogTitle>
        <List>
            <ListItem style={{ textAlign: 'center' }} button onClick={() => props.setLang('en')}>
                <ListItemText primary={t('core:lang.en')} />
            </ListItem>
            <ListItem style={{ textAlign: 'center' }} button onClick={() => props.setLang('fr')}>
                <ListItemText primary={t('core:lang.fr')} />
            </ListItem>
        </List>
    </Dialog>;
}