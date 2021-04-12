import dark from './dark';
import light from './light';

const themes = {
    light,
    dark,
}

export default function getTheme(theme: "light" | "dark") {
    return themes[theme];
}