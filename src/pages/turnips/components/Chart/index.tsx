import {
    ArrayOrString, bb, Chart as BBChart, Data, PrimitiveArray
} from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import React from 'react';
import { Dict } from '../../../../misc';
import './dark.scss';
import { ChartProps } from './types';
// lifted from react-billboardjs and modified to work in typescript
/* MIT License

Copyright (c) 2017 Tony Quetano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */
function shallowEqual(a: Dict<any>, b: Dict<any>) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const length = aKeys.length;

    if (length !== bKeys.length) {
        return false;
    }

    let index = -1;

    while (++index < length) {
        const key = aKeys[index];

        if (key !== bKeys[index] || a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}
class Chart extends React.Component<ChartProps> {
    static displayName = 'Chart';
    chart: BBChart | null;
    chartElement: HTMLDivElement | null;

    static getInstances = () => {
        return bb.instance;
    };

    constructor(props: ChartProps) {
        super(props);

        this.chart = null;
        this.chartElement = null;

        // Explicit binds instead of arrow functions for lower memory footprint.
        this.exportChart = this.exportChart.bind(this);
        this.destroyChart = this.destroyChart.bind(this);
        this.loadData = this.loadData.bind(this);
        this.redraw = this.redraw.bind(this);
        this.setChart = this.setChart.bind(this);
        this.setChartElementRef = this.setChartElementRef.bind(this);
        this.unloadData = this.unloadData.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
    }

    componentDidMount() {
        this.updateChart();
    }

    shouldComponentUpdate(nextProps: ChartProps) {
        return !nextProps.isPure || !shallowEqual(this.props, nextProps);
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    destroyChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = null;
    }

    exportChart(mimeType: string, onExported: ((dataUrl: string) => string) | undefined = undefined) {
        if (!this.chart) {
            // eslint-disable-next-line no-console
            return console.error('No chart is available to export.');
        }

        this.chart.export({ mimeType, preserveAspectRatio: true }, onExported);
    }

    loadData(data: Data) {
        if (!this.chart) {
            // eslint-disable-next-line no-console
            return console.error(
                'No chart is available to which data can be loaded. It may already have been destroyed, or has never been drawn.',
            );
        }

        this.chart.load(data as {
            url?: string;
            json?: [{ [key: string]: string }];
            rows?: PrimitiveArray[];
            columns?: PrimitiveArray[];
            data?: Array<{ [key: string]: number }>;
            names?: { [key: string]: string };
            xs?: { [key: string]: string };
            classes?: { [key: string]: string };
            categories?: string[];
            axes?: { [key: string]: string | string[] };
            colors?: { [key: string]: string };
            headers?: { [key: string]: string };
            keys?: { [key: string]: string };
            mimeType?: string;
            type?: string;
            types?: { [key: string]: string };
            unload?: boolean | ArrayOrString;
            done?: () => any;
        });
    }

    redraw() {
        if (!this.chart) {
            // eslint-disable-next-line no-console
            return console.error('No chart is available to draw.');
        }

        this.chart.flush();
    }

    setChart(data: Data) {
        if (this.chart) {
            this.loadData(data);
        } else {
            const {
                className: classNameIgnored,
                domProps: domPropsIgnored,
                isPure: isPureIgnored,
                style: styleIgnored,
                unloadBeforeLoad: unloadBeforeLoadIgnored,
                ...config
            } = this.props;

            this.chart = bb.generate({
                bindto: this.chartElement,
                ...config,
            });
        }
    }

    setChartElementRef(element: HTMLDivElement) {
        this.chartElement = element;
    }

    unloadData(data: any) {
        if (!this.chart) {
            // eslint-disable-next-line no-console
            return console.error(
                'No chart is available from which data can be unloaded. It may already have been destroyed, or has never been drawn.',
            );
        }

        this.chart.unload(data);
    }

    updateChart() {
        const { data, unloadBeforeLoad } = this.props;
        const dataToLoad = unloadBeforeLoad ? { ...data, unload: true } : data;

        this.setChart(dataToLoad);
    }

    updateConfig(name: string, value: any, redraw: boolean | undefined) {
        if (!this.chart) {
            // eslint-disable-next-line no-console
            return console.error(
                'You are trying to set the config a chart that does not exist.' +
                'Have you passed `data`?',
            );
        }

        return this.chart.config(name, value, redraw);
    }

    render() {
        const { className, domProps, style } = this.props;

        return (
            <div
                className={className}
                style={style}
                {...domProps}
                ref={this.setChartElementRef}
            />
        );
    }
}
export default Chart;
