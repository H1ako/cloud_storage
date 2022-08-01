// global
import React from 'react'

interface Props {
    children: React.ReactNode,
    posX: number,
    posY: number,
}


export const RClickWindowLayout = React.forwardRef<HTMLDivElement, Props>(({children, posX, posY}, ref) => {
    return (
        <div ref={ref} style={{top: posY ?? 0, left: posX ?? 0}} className='rclick-window'>
            {children}
        </div>
    )
})