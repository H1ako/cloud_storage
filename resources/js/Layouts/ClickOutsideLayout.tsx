// global
import React from 'react'


interface Props {
    children: React.ReactElement,
    onClick: (e: MouseEvent) => void,
}

export const ClickOutsideLayout = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    
    const handleClickOutside = (e: MouseEvent) => {
        const refFixed = ref as React.RefObject<HTMLDivElement>

        if (!(refFixed.current)) return

        if (props.onClick && !refFixed.current.contains(e.target as HTMLElement)) {
            props.onClick(e)
        }
    }

    React.useEffect(() => {
      document.addEventListener('mouseup', handleClickOutside)

        return () => document.removeEventListener('mouseup', handleClickOutside)
    }, [props.onClick]);

    return (
        <>
            {React.cloneElement((props.children), { ref })}
        </>
    )
})