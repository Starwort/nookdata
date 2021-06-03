import { useTheme } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React from 'react';
import { useTranslation } from "react-i18next";
import WithTooltip from "./WithTooltip";

export default function UpdateReadyIcon() {
    const { t } = useTranslation('service');
    const theme = useTheme();
    return <WithTooltip tooltip={t('service:available_update.title')}>
        <GetApp style={{ color: theme.palette.success.main }} />
    </WithTooltip>;
}