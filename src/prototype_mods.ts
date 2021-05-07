declare global {
    interface String {
        capitalise: () => String;
    }
    interface Array<T> {
        rotated: (by: number) => Array<T>;
        rotate: (by: number) => Array<T>;
    }
}
String.prototype.capitalise = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.rotated = function (by: number) {
    by = by % this.length;
    return this.slice(by, this.length).concat(this.slice(0, by));
}
Array.prototype.rotate = function (by: number) {
    by = by % this.length;
    while (this.length && by < 0) by += this.length;
    this.push.apply(this, this.splice(0, by));
    return this;
}

declare module "react" {
    interface CSSProperties {
        '--progress'?: string | number;
    }
}

declare module "@material-ui/core/styles/createPalette" {
    interface ElevationColour {
        0: { main: string };
        1: { main: string };
        2: { main: string };
        3: { main: string };
        4: { main: string };
        6: { main: string };
        8: { main: string };
        12: { main: string };
        16: { main: string };
        24: { main: string };
    }
    interface PaletteColor {
        transparent?: string;
    }
    interface SimplePaletteColorOptions {
        transparent?: string;
    }
    interface Palette {
        elevations: ElevationColour;
        opacity: number;
        modelled: Palette['primary'];
        spring: Palette['primary'];
        summer: Palette['primary'];
        autumn: Palette['primary'];
        winter: Palette['primary'];
    }
    interface PaletteOptions {
        elevations: ElevationColour;
        opacity: number;
        modelled: PaletteOptions['primary'];
        spring: PaletteOptions['primary'];
        summer: PaletteOptions['primary'];
        autumn: PaletteOptions['primary'];
        winter: PaletteOptions['primary'];
    }
}
export { };
