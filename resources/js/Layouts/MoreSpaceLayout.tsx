// global
import React from 'react'

interface Props {
    children: React.ReactNode,
}

export default function MoreSpaceLayout(props: Props) {
    const { children } = props

    return (
        <>
            {children}
        </>
    )
}