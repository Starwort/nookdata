import {ChartOptions, Data} from 'billboard.js';
type objectOf<V> = {
    [key: string]: V;
};
type bool = boolean;
type func = any;
type AREA_SHAPE = {
    above: bool,
    front: bool,
    linearGradient: (
        bool |
        {
            x: number[],
            y: number[],
            stops: any[],
        }
    ),
    zerobased: bool,
};

type LABEL_SHAPE = (
    {
        position: (
            'inner-bottom' |
            'inner-center' |
            'inner-left' |
            'inner-middle' |
            'inner-right' |
            'inner-top' |
            'outer-bottom' |
            'outer-center' |
            'outer-left' |
            'outer-middle' |
            'outer-right' |
            'outer-top'
        ),
        text: string,
    } |
    string
);

type AXIS_TYPE_SHAPE = 'category' | 'indexed' | 'timeseries';

type AXIS_Y_PADDING_SHAPE = {
    bottom: number,
    top: number,
};

type AXIS_TICK_SHAPE = {
    count: number,
    culling: (
        bool |
        {
            max: number,
        }
    ),
    format: func,
    outer: bool,
    rotate: number,
    show: bool,
    stepSize: number,
    text: {
        position: {
            x: number,
            y: number,
        },
        show: bool,
    },
    values: (number | Date)[],
};

type AXES_SHAPE = {
    domain: number[],
    tick: {
        outer: bool,
        format: func,
        count: number,
        values: number[],
    },
}[];

type AXIS_SHAPE = {
    rotated: bool,
    x: {
        axes: AXES_SHAPE,
        categories: string[],
        clipPath: bool,
        extent: number[],
        height: number,
        label: LABEL_SHAPE,
        localtime: bool,
        max: number,
        min: number,
        padding: {
            left: number,
            right: number,
        },
        show: bool,
        tick: {
            centered: bool,
            count: number,
            culling: (
                bool |
                {
                    max: number,
                }
            ),
            fit: bool,
            format: func | string,
            multiline: bool,
            outer: bool,
            rotate: number,
            tooltip: bool,
            values: (number | Date)[],
            width: number,
        },
        type: AXIS_TYPE_SHAPE,
    },
    y: {
        axes: AXES_SHAPE,
        center: number,
        clipPath: bool,
        default: number[],
        format: func,
        inner: bool,
        inverted: bool,
        label: LABEL_SHAPE,
        max: number,
        min: number,
        padding: AXIS_Y_PADDING_SHAPE,
        show: bool,
        tick: AXIS_TICK_SHAPE,
        type: AXIS_TYPE_SHAPE,
    },
    y2: {
        axes: AXES_SHAPE,
        center: number,
        default: number[],
        inner: bool,
        inverted: bool,
        label: LABEL_SHAPE,
        max: number,
        min: number,
        padding: AXIS_Y_PADDING_SHAPE,
        show: bool,
        tick: AXIS_TICK_SHAPE,
    },
};

type BACKGROUND_SHAPE = {
    class: string,
    color: string,
    imgUrl: string,
};

type BAR_SHAPE = {
    label: {
        threshold: number,
    },
    padding: number,
    radius: (
        number |
        {
            ratio: number,
        }
    ),
    sensitivity: number,
    width: (
        number |
        {
            dataname: number,
            max: number,
            ratio: number,
        }
    ),
    zerobased: bool,
};

type BUBBLE_SHAPE = {
    maxR: number | func,
    zerobased: bool,
};

type CANDLESTICK_SHAPE = {
    color: {
        down: (
            string |
            {
                dataname: string,
            }
        ),
    },
    width: number,
};

type COLOR_SHAPE = {
    onover: string | func | object,
    pattern: string[],
    tiles: func,
    threshold: {
        max: number,
        unit: string,
        value: string,
    },
};

type LINE_SHAPE = {
    classes: string[],
    connectNull: bool,
    point: string[] | bool,
    step: {
        type: 'step' | 'step-after' | 'step-before',
    },
    zerobased: bool,
};

type ORDER_SHAPE = func | 'asc' | 'desc' | '' | null;

type DATA_TYPE_SHAPE = (
    'area' |
    'area-line-range' |
    'area-range' |
    'area-spline' |
    'area-step' |
    'bar' |
    'bubble' |
    'donut' |
    'gauge' |
    'line' |
    'pie' |
    'radar' |
    'scatter' |
    'spline'
);

type DATA_SHAPE = {
    axes: object,
    classes: object,
    color: (
        func |
        {
            pattern: string[],
            tiles: func,
        }
    ),
    colors: objectOf<func |
    {
        pattern: string[],
        tiles: func,
    }>,
    columns: (
        number[] |
        number |
        {
            height: number,
            low: number,
            mid: number,
        } |
        string
    )[][],
    empty: {
        label: LABEL_SHAPE,
    },
    filter: func,
    groups: (string[] | string)[],
    headers: string,
    hide: bool | string[],
    idConverter: func,
    json: object[] | object,
    keys: {
        value: string[],
        x: (string[] | string),
        y: (string[] | string),
        y2: (string[] | string),
    },
    labels: (
        bool |
        {
            format: func,
            position: {
                x: number,
                y: number,
            },
        }
    ),
    line: LINE_SHAPE,
    mimeType: string,
    names: object,
    onclick: func,
    onmax: func,
    onmin: func,
    onout: func,
    onover: func,
    onselected: func,
    onunselected: func,
    order: ORDER_SHAPE,
    point: {
        focus: {
            expand: {
                enabled: bool,
                r: bool | number,
            },
        },
        pattern: string[],
        r: number | func,
        select: {
            r: number,
        },
        show: bool,
        type: 'circle' | 'rectangle',
    },
    regions: object,
    rows: (number | string)[][],
    selection: {
        draggable: bool,
        enabled: bool,
        grouped: bool,
        isselectable: bool,
        multiple: bool,
    },
    stack: {
        normalize: bool,
    },
    type: DATA_TYPE_SHAPE,
    types: objectOf<DATA_TYPE_SHAPE>,
    url: string,
    x: string,
    xFormat: string,
    xLocaltime: bool,
    xSort: bool,
    xs: object,
};

type DONUT_SHAPE = {
    expand: bool,
    label: {
        format: func,
        ratio: func | number,
        show: bool,
        threshold: number,
    },
    padAngle: number,
    startingAngle: number,
    title: string,
    width: number,
};

type GAUGE_SHAPE = {
    arcs: {
        minWidth: string,
    },
    arcLength: number,
    background: bool,
    expand: (
        bool |
        {
            duration: number,
            rate: number,
        }
    ),
    fullCircle: bool,
    label: {
        extents: func,
        format: func,
        show: bool,
    },
    max: number,
    min: number,
    startingAngle: number,
    title: string,
    type: string,
    units: string,
    width: number,
};

type LINES_SHAPE = (
    {
        class: string,
        position: string,
        text: string,
        value: number | string | Date,
    }[] |
    bool
);

type GRID_SHAPE = {
    focus: {
        edge: bool,
        show: bool,
        y: bool,
    },
    front: bool,
    lines: {
        front: bool,
    },
    x: {
        lines: LINES_SHAPE,
        show: bool,
    },
    y: {
        lines: LINES_SHAPE,
        show: bool,
        ticks: bool | number,
    },
};

type INTERACTION_SHAPE = {
    brighten: bool,
    enabled: bool,
    inputType: {
        mouse: bool,
        touch: (
            bool |
            {
                preventDefault: bool | number,
            }
        ),
    },
};

type LEGEND_SHAPE = {
    contents: {
        bindto: object | string,
        template: func | string,
    },
    equally: bool,
    hide: bool,
    inset: {
        anchor: (
            'bottom-left' |
            'bottom-right' |
            'top-left' |
            'top-right'
        ),
        step: number,
        x: number,
        y: number,
    },
    item: {
        onclick: func,
        onout: func,
        onover: func,
        tile: {
            height: number,
            width: number,
        },
    },
    padding: number,
    position: 'bottom' | 'right' | 'inset',
    show: bool,
    usePoint: bool,
};

type PADDING_SHAPE = {
    bottom: number,
    left: number,
    right: number,
    top: number,
};

type PIE_SHAPE = {
    expand: (
        bool |
        {
            duration: number,
            rate: number,
        }
    ),
    innerRadius: number,
    label: {
        format: func,
        ratio: number,
        show: bool,
        threshold: number,
    },
    outerRadius: number,
    padAngle: number,
    padding: number,
    startingAngle: number,
};

type POINT_SHAPE = {
    focus: {
        expand: {
            enabled: bool,
            r: number,
        },
    },
    opacity: number,
    pattern: string[],
    r: number | func,
    select: {
        r: number,
    },
    show: bool,
    type: string,
};

type RADAR_SHAPE = {
    axis: {
        line: {
            show: bool,
        },
        max: number,
        text: {
            position: {
                x: number,
                y: number,
            },
            show: bool,
        },
    },
    direction: {
        clockwise: bool,
    },
    level: {
        depth: number,
        show: bool,
        text: {
            format: func,
            show: bool,
        },
    },
    size: {
        ratio: number,
    },
};

type REGION_SHAPE = {
    axis: string,
    class: string,
    end: number | string,
    start: number | string,
    style: object,
};

type RENDER_SHAPE = {
    lazy: bool,
    observe: bool,
};

type RESIZE_SHAPE = {
    auto: bool,
};

type SCATTER_SHAPE = {
    zerobased: bool,
};

type SIZE_SHAPE = {
    height: number,
    width: number,
};

type SPLINE_SHAPE = {
    interpolation: {
        type: string,
    },
};

type SUBCHART_SHAPE = {
    axis: {
        x: {
            show: bool,
            tick: {
                show: bool,
                text: {
                    show: bool,
                },
            },
        },
    },
    onbrush: bool | func,
    show: bool,
    size: {
        height: number,
    },
};

type SVG_SHAPE = {
    className: string,
};

type TITLE_SHAPE = {
    padding: PADDING_SHAPE,
    position: 'center' | 'right' | 'left',
    text: string,
};

type TOOLTIP_SHAPE = {
    contents: (
        func |
        {
            bindto: object | string,
            template: string,
            text: object,
        }
    ),
    doNotHide: bool,
    format: {
        name: func,
        title: func,
        value: func,
    },
    init: {
        show: bool,
        position: object,
        x: number,
    },
    grouped: bool,
    linked: (
        bool |
        {
            name: string,
        }
    ),
    onshow: func,
    onhide: func,
    onshown: func,
    onhidden: func,
    order: ORDER_SHAPE,
    position: func,
    show: bool,
};

type TRANSITION_SHAPE = {
    duration: number,
};

type ZOOM_SHAPE = {
    enabled: (
        bool |
        {
            type: string,
        }
    ),
    extent: number[],
    onzoom: func,
    onzoomend: func,
    onzoomstart: func,
    rescale: bool,
    resetButton: (
        bool |
        {
            onclick: func,
            text: string,
        }
    ),
    x: {
        max: number,
        min: number,
    },
    type: string,
};

export type ChartProps = ChartOptions & {
    className?: string,
    domProps?: object,
    isPure?: bool,
    style?: object,
    unloadBeforeLoad?: bool,
    data: Data,
};