import React from 'react';
import './Centred.scss';
interface CentredProps {
    children: React.ReactNode;
}
export default function Centred(props: CentredProps) {
    return <div className="centred">
        {props.children}
    </div>;
}