// global
import React from 'react'

interface Props {
    children: React.ReactNode,
}

export default function WindowLayout({ children }: Props) {
    React.useEffect(() => {
        const body = document.querySelector('body');

        body?.classList.add('no-scroll')

        return () => {
            body?.classList.remove('no-scroll')
        }
    }, [])

    return (
        <div className='window-area'>
            {children}
        </div>
    )
}