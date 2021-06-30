import {useTheme} from '@material-ui/core';
import './Loading.scss';
export default function Loading() {
    const theme = useTheme();
    return <video autoPlay loop muted playsInline className={`loader ${theme.name}`}>
        <source src="assets/shared/loading.gif.webm" type="video/webm" />
        <source src="assets/shared/loading.gif.mp4" type="video/mp4" />
    </video>;
}