import React from 'react';
export default function Loading() {
    return <video autoPlay loop muted playsInline className="loader">
        <source src="assets/shared/loading.gif.webm" type="video/webm" />
        <source src="assets/shared/loading.gif.mp4" type="video/mp4" />
    </video>;
}