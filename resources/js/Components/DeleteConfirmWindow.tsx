// global
import React from 'react'
// layouts
import { ConfirmWindowLayout } from '../Layouts/ConfirmWindowLayout';


interface Props {
    fileApi: IFileApi,
    closeWindow: () => void
}

export const DeleteConfirmWindow =({ fileApi, closeWindow }: Props) => {
    const confirmHandler = () => {
        fileApi.deleteFile()
        closeWindow()
    }

    
    return (
        <ConfirmWindowLayout
            confirm={confirmHandler}
            confirmButtonText='Delete'
            cancel={closeWindow}
        >
            <h3 className="confirm-window__heading">Are you sure you want to Delete this File?</h3>
        </ConfirmWindowLayout>
    )
}