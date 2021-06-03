import React from 'react';
interface WithTooltipProps {
    tooltip: string;
    children: React.ReactNode;
}
export default function WithTooltip({ tooltip, children }: WithTooltipProps) {
    return <div title={tooltip}>{children}</div>
}