// global
import React from 'react'
// components
import Header from '../Components/Header';
import Asidebar from '../Components/Asidebar';

interface Props {
    children: React.ReactNode
}

export default function PageLayout(props: Props) {
    const { children } = props

    return (
        <div className="page">
            <Header />
            <Asidebar />
            <main>
                <>{children}</>
            </main>
        </div>
    )
}