import { IconButton, Tooltip } from "@material-ui/core";
import { OfflinePin } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export default function WorksOfflineIcon({ setStatus }: { setStatus: (value: boolean) => void }) {
    const { t } = useTranslation('service');
    return <Tooltip title={t('service:available_offline.frame_button') as string}>
        <IconButton onClick={() => setStatus(false)}>
            <OfflinePin />
        </IconButton>
    </Tooltip>;
}