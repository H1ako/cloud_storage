// global
import React from 'react'
// layouts
import { ConfirmWindowLayout } from '../Layouts/ConfirmWindowLayout';


interface Props {
    fileApi: IUseFileApiReturned,
    closeWindow: () => void
}

export const RenameWindow =({ fileApi, closeWindow }: Props) => {
    const confirmHandler = () => {
        fileApi.renameFile()
        closeWindow()
    }


    return (
        <ConfirmWindowLayout
            confirm={confirmHandler}
            confirmButtonText="Rename"
            cancel={closeWindow}
        >
            <input value={fileApi.fileName} placeholder='File Name' className='confirm-window__input' type="text" onChange={e => fileApi.updateName(e.target.value)} />
        </ConfirmWindowLayout>
    )
}