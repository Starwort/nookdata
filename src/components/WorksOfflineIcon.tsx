import { OfflinePin } from "@material-ui/icons";
import React from 'react';
import { useTranslation } from "react-i18next";
import WithTooltip from "./WithTooltip";

export default function WorksOfflineIcon() {
    const { t } = useTranslation('service');
    return <WithTooltip tooltip={t('service:available_update.title')}>
        <OfflinePin />
    </WithTooltip>;
}