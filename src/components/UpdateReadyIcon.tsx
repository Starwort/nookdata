import { IconButton, Tooltip, useTheme } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export default function UpdateReadyIcon() {
    const { t } = useTranslation('service');
    const theme = useTheme();
    return <Tooltip title={t('service:available_update.frame_button') as string} aria-label={t('service:available_update.title')}>
        <IconButton onClick={() => (window.location.replace(window.location.href))}>
            <GetApp style={{ color: theme.palette.success.main }} />
        </IconButton>
    </Tooltip>;
}