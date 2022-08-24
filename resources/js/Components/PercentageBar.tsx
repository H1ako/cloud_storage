// global
import React from 'react'

interface Props {
    value: number,
    maxValue: number
}

export default function PercentageBar({ value, maxValue }: Props) {
    return (
        <div
            className="percentage-bar"
            style={{'--usedSpacePercent': Math.min(Math.round(value / maxValue * 100), 100)} as React.CSSProperties}
        />
    )
}