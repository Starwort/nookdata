declare module 'react-billboardjs' {
    import { ChartOptions, Data } from 'billboard.js';
    type BillboardChartProps = ChartOptions & {
        className?: string,
        domProps?: object,
        isPure?: boolean,
        style?: object,
        unloadBeforeLoad?: boolean,
        data: Data,
    };
    export default function BillboardChart(props: BillboardChartProps): JSX.Element | null;
}
