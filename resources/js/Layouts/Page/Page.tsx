// global
import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function PageLayout(props: Props) {
    const { children } = props

    return (
        <div className="page">
            <main>
                <>{children}</>
            </main>
        </div>
    )
}