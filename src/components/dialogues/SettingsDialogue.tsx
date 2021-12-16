import {Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme} from "@material-ui/core";
import React from 'react';
import {useTranslation} from "react-i18next";
import {Centred} from "..";
import {useData, useTime} from "../../context";
import {UserSettings} from "../../data";
import {availableLocalisations} from "../../i18n";
import {ThemeName, themeNames} from "../../themes";

interface SettingsDialogueProps {
    open: boolean;
    setOpen(open: boolean): void;
    setSettings(settings: UserSettings): void;
}

export default function SettingsDialogue({open, setOpen, setSettings}: SettingsDialogueProps) {
    const {t, i18n} = useTranslation('core');
    const time = useTime();
    const theme = useTheme();
    const {settings} = useData();
    const [date, setDate] = React.useState(new Date());
    React.useEffect(
        () => void setTimeout(setDate, 10, time),
        [open]
    );
    return <Dialog aria-labelledby="settings-dialogue-title" open={open} onClose={() => setOpen(false)}
        PaperProps={{
            style: {
                width: "75%",
            }
        }}>
        <DialogTitle id="settings-dialogue-title">{t('core:settings.title')}</DialogTitle>
        <DialogContent>
            <Centred>
                <Typography variant="subtitle1">
                    {t('core:settings.system.title')}
                </Typography>
            </Centred>
            <Grid container spacing={2} style={{paddingTop: 8}}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="lang-label">{t('core:settings.system.lang.choose')}</InputLabel>
                        <Select
                            value={i18n.language}
                            onChange={(event) => i18n.changeLanguage(event.target.value as string)}
                            labelId='lang-label'
                            fullWidth
                        >
                            {availableLocalisations.map(lang =>
                                <MenuItem value={lang}>
                                    {t(`core:settings.system.lang.${lang}`)}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="theme-label">{t('core:settings.system.theme.choose')}</InputLabel>
                        <Select
                            value={theme.name}
                            onChange={(event) => {
                                document.body.classList.add("no-transition");
                                setSettings({...settings, theme: event.target.value as ThemeName});
                                setTimeout(() => document.body.classList.remove("no-transition"), 10);
                            }}
                            labelId='theme-label'
                            fullWidth
                        >
                            {themeNames.map(theme =>
                                <MenuItem value={theme}>
                                    {t(`core:settings.system.theme.${theme}`)}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Centred>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.useTwelveHourTime}
                                    onChange={(event) => {
                                        setDate(new Date());
                                        setSettings({...settings, useTwelveHourTime: event.target.checked});
                                    }}
                                    color="primary"
                                />
                            }
                            label={t('core:settings.system.time.use_twelve_hour')}
                        />
                    </Centred>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Centred>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settings.useSystemTime}
                                    onChange={(event) => {
                                        setDate(new Date());
                                        setSettings({...settings, useSystemTime: event.target.checked});
                                    }}
                                    color="primary"
                                />
                            }
                            label={t('core:settings.system.time.system')}
                        />
                    </Centred>
                </Grid>
                {settings.useSystemTime ||
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={t('core:settings.system.time.override')}
                            type="datetime-local"
                            value={date.toString('yyyy-MM-ddTHH:mm')}
                            onChange={(event) => {
                                const newDate = Date.parse(event.target.value);
                                if (newDate) {
                                    setDate(newDate);
                                    setSettings({
                                        ...settings,
                                        useSystemTime: false,
                                        timeOffset: newDate.set({second: 0, millisecond: 0} as any).getTime() - (new Date()).set({second: 0, millisecond: 0} as any).getTime(),
                                    });
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                }
            </Grid>
            <Centred>
                <Typography variant="subtitle1" style={{paddingTop: 16}}>
                    {t('core:settings.island.title')}
                </Typography>
            </Centred>
            <Grid container spacing={2} style={{paddingTop: 8}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label={t('core:settings.island.name')}
                        value={settings.islandName}
                        onChange={(event) => setSettings({...settings, islandName: event.target.value as string})}
                        fullWidth
                        InputLabelProps={{
                            shrink: !!settings.islandName,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="hemi-label">{t('core:settings.island.hemisphere.choose')}</InputLabel>
                        <Select
                            value={settings.hemisphere}
                            onChange={(event) => setSettings({...settings, hemisphere: event.target.value as 'north' | 'south'})}
                            labelId='hemi-label'
                            fullWidth
                        >
                            <MenuItem value="north">{t('core:settings.island.hemisphere.north')}</MenuItem>
                            <MenuItem value="south">{t('core:settings.island.hemisphere.south')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label={t('core:settings.island.player_name')}
                        value={settings.playerName}
                        onChange={(event) => setSettings({...settings, playerName: event.target.value as string})}
                        fullWidth
                        InputLabelProps={{
                            shrink: !!settings.playerName,
                        }}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>{t('core:ui.done')}</Button>
        </DialogActions>
    </Dialog>;
}