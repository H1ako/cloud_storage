// global
import React from 'react'


interface Props {
    children: React.ReactNode,
    onClick: undefined | ((...props: any) => void),
}

const ClickOutsideLayout = React.forwardRef<HTMLDivElement, Props>(({ children, onClick }, ref) => {
    const handleClickOutside = (e: MouseEvent) => {
        const refFixed = ref as React.RefObject<HTMLDivElement>

        if (!refFixed.current) return
        

        if (onClick && !refFixed.current.contains(e.target as HTMLElement)) {
            onClick(e)
        }
    }

    React.useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside)

        return () => document.removeEventListener('mouseup', handleClickOutside)
    }, [onClick]);

    return (
        <>
            {React.cloneElement((children as React.ReactElement), { ref })}
        </>
    )
})

export default ClickOutsideLayout