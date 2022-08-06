// global
import React from 'react'
// layouts
import WindowLayout from './WindowLayout';


interface Props {
    confirm: (e: React.MouseEvent) => void,
    cancel: (e: React.MouseEvent) => void,
    text?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    children?: React.ReactNode
}

export const ConfirmWindowLayout = ({ confirm, cancel, children, text='', confirmButtonText='Confirm', cancelButtonText='Cancel'}: Props) => {
    return (
        <WindowLayout>
            <div className="confirm-window">
                <>{children}</>
                <div className="confirm-window__btns">
                    <button className="btns__btn confirm-btn" onClick={confirm}>{confirmButtonText}</button>
                    <button className="btns__btn cancel-btn" onClick={cancel}>{cancelButtonText}</button>
                </div>
            </div>
        </WindowLayout>
    )
}