// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';
// store
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
import { AppDispatch } from '../store/store';


type ReceivedFileType = IFile | null

export default function useFileApi(file: ReceivedFileType, dispatch: AppDispatch) {
    const [ fileForAction, setFileForAction ] = React.useState<ReceivedFileType>(null)
    const [ fileNameForAction, setFileNameForAction ] = React.useState<string>('')
    const [ shareLinkForAction, setShareLinkForAction ] = React.useState<string>('')

    function deleteFile() {
        if (fileForAction) {
            Inertia.delete(`/api/files/${fileForAction.id}`)
        }
        dispatch(closeFileWindow())
    }

    function renameFile() {
        if (fileForAction && fileNameForAction) {
            Inertia.put(`/api/files/${fileForAction.id}`, {name: fileNameForAction})
        }
        dispatch(closeFileWindow())
    }

    function shareFile() {
        if (fileForAction) {
            Inertia.put(`/api/files/${fileForAction.id}`, {shareLink: shareLinkForAction})
        }
        dispatch(closeFileWindow())
    }

    function updateFile(newFile: ReceivedFileType) {
        if (!newFile) return

        setFileForAction(newFile)
        setShareLinkForAction(newFile.shareLink)
        setFileNameForAction(newFile.name)
    }

    function updateShareLink(shareLink: ShareLinkType) {
        if (shareLink) setShareLinkForAction(shareLink)
        else setShareLinkForAction('')
    }

    function updateName(fileName: string) {
        if (!fileName) return

        setFileNameForAction(fileName)
    }

    function copyShareLink() {
        if (!fileForAction) return

        const origin = window.location.origin
        const link = `${origin}/files/${fileForAction.shareLink}`

        navigator.clipboard.writeText(link)
    }

    React.useEffect(() => {
        if (!file) return

        updateFile(file)
        updateShareLink(file.shareLink)
        updateName(file.name)
    }, [file])

    return {
        updateFile,
        deleteFile,
        renameFile,
        shareFile,
        updateName,
        updateShareLink,
        copyShareLink,
        file: fileForAction,
        shareLink: shareLinkForAction,
        fileName: fileNameForAction
    }
}