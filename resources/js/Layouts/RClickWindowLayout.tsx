// global
import React from 'react'

interface Props {
    children: React.ReactNode,
    posX: number,
    posY: number,
}


export default function RClickWindowLayout({children, posX, posY}: Props) {
    return (
        <div style={{top: posY ?? 0, left: posX ?? 0}} className='rclick-window'>
            {children}
        </div>
    )
}