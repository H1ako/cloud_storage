// global
import React from 'react'

interface Props {
    children: React.ReactNode,
}

export default function WindowLayout(props: Props) {
    const { children } = props

    return (
        <div className='window-area'>
            {children}
        </div>
    )
}