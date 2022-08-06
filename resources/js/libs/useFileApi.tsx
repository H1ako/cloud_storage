// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';


export default function useFileApi<Props>(file: ReceivedFileType): IUseFileApiReturned {
    const [ fileForAction, setFileForAction ] = React.useState<ReceivedFileType>(null)
    const [ fileName, setFileName ] = React.useState<string>('')
    const [ shareLink, setShareLink ] = React.useState<string>('')


    function deleteFile() {
        if (fileForAction) {
            Inertia.delete(`/api/files/${fileForAction.id}`)
        }
    }

    function renameFile() {
        if (fileForAction && fileName) {
            Inertia.put(`/api/files/${fileForAction.id}`, {name: fileName})
        }
    }

    function shareFile() {
        if (fileForAction) {
            Inertia.put(`/api/files/${fileForAction.id}`, {shareLink: shareLink})
        }
    }

    function updateFile(newFile: ReceivedFileType) {
        if (!newFile) return

        setFileForAction(newFile)
        setShareLink(newFile.shareLink)
        setFileName(newFile.name)
    }

    function updateShareLink(newShareLink: ShareLinkType) {
        if (newShareLink) setShareLink(newShareLink)
        else setShareLink('')
    }

    function updateName(newFileName: string) {
        if (!newFileName) return

        setFileName(newFileName)
    }

    function copyShareLink() {
        if (!fileForAction) return

        const origin = window.location.origin
        const link = `${origin}/files/${fileForAction.shareLink}`

        navigator.clipboard.writeText(link)
    }
    

    React.useEffect(() => {
        updateFile(file)
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
        shareLink,
        fileName
    }
}