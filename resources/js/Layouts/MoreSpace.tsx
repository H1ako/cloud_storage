// global
import React from 'react'

interface Props {
    children: React.ReactNode,
}

export default function MoreSpace(props: Props) {
    const { children } = props

    return (
        <>
            {children}
        </>
    )
}