// global
import React from 'react'
// store
import { useAppDispatch } from '../store/hooks';
import { openSubscriptionsWindow } from '../store/slices/subscriptionsSlice';

interface Props {
    children: React.ReactNode,
    className?: string
}

export default function MoreSpaceBtn({ children, className }: Props) {
    const dispatch = useAppDispatch()

    const openWindow = () => {
        dispatch(openSubscriptionsWindow())
    }

    return (
        <button className={className} onClick={openWindow}>
            {children}
        </button>
    )
}