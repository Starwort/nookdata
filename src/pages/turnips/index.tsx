import { Card, CardContent, CardHeader, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Pattern, UserTurnipsData } from './data';

export default function Turnips() {
    if (!window.localStorage.turnips) {
        let data: UserTurnipsData = {
            buy: null,
            mon: { am: null, pm: null },
            tue: { am: null, pm: null },
            wed: { am: null, pm: null },
            thu: { am: null, pm: null },
            fri: { am: null, pm: null },
            sat: { am: null, pm: null },
            previousPattern: Pattern.UNKNOWN,
            firstBuy: false,
        };
        window.localStorage.turnips = JSON.stringify(data);
    }
    const data: UserTurnipsData = JSON.parse(window.localStorage.turnips);
    return <div style={{ maxWidth: Infinity, margin: 'auto' }}>
        <Card>
            <CardHeader
                style={{ paddingBottom: 0, textAlign: 'center' }}
                title="Turnip Prices"
            />
            <CardContent>
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <TextField />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>;
};