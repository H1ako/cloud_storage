// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';
// store
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
import { AppDispatch } from '../store/store';


type ReceivedFileType = IFile | null

export default function useFileApi(file: ReceivedFileType, dispatch: AppDispatch) {
    const [ fileForAction, setFileForAction ] = React.useState<ReceivedFileType>(null)

    function deleteFile() {
        if (fileForAction) {
            Inertia.delete(`/api/files/${fileForAction.id}`)
        }
        dispatch(closeFileWindow())
    }

    function renameFile(fileName: string) {
        if (fileForAction && fileName) {
            Inertia.put(`/api/files/${fileForAction.id}`, {name: fileName})
        }
        dispatch(closeFileWindow())
    }

    function shareFile(shareLink: string) {
        if (fileForAction) {
            Inertia.put(`/api/files/${fileForAction.id}`, {shareLink: shareLink})
        }
        dispatch(closeFileWindow())
    }

    function updateFile(newFile: ReceivedFileType) {
        if (!newFile) return

        setFileForAction(newFile)
    }

    React.useEffect(() => {
        updateFile(file)
    }, [])

    return {
        updateFile,
        deleteFile,
        renameFile,
        shareFile,
        file: fileForAction
    }
}