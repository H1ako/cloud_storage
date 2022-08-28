// global
import React from 'react'
// components
import AuthHeader from '../Components/AuthHeader';

interface Props {
    children: React.ReactNode,
}

export default function AuthPageLayout({ children }: Props) {
    return (
        <div className="auth-page">
            <AuthHeader />
            <main>
                <>{children}</>
            </main>
        </div>
    )
}