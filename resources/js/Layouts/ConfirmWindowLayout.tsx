// global
import React from 'react'
// layouts
import WindowLayout from './WindowLayout';
import ClickOutsideLayout from './ClickOutsideLayout';


interface Props {
    confirm: (e: React.MouseEvent) => void,
    cancel: (e: React.MouseEvent) => void,
    confirmButtonText?: string,
    cancelButtonText?: string,
    children?: React.ReactNode
}

export const ConfirmWindowLayout = ({ confirm, cancel, children, confirmButtonText='Confirm', cancelButtonText='Cancel'}: Props) => {
    const windowRef = React.useRef<HTMLDivElement>(null)

    return (
        <WindowLayout>
            <ClickOutsideLayout onClick={cancel} ref={windowRef}>
                <div ref={windowRef} className="confirm-window">
                    <>{children}</>
                    <div className="confirm-window__btns">
                        <button className="btns__btn confirm-btn" onClick={confirm}>{confirmButtonText}</button>
                        <button className="btns__btn cancel-btn" onClick={cancel}>{cancelButtonText}</button>
                    </div>
                </div>
            </ClickOutsideLayout>
        </WindowLayout>
    )
}