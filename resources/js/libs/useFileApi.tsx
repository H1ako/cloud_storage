// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';


export default function useFileApi<Props>(file: ReceivedFileType): IFileApi {
    const [ fileForAction, setFileForAction ] = React.useState<ReceivedFileType>(null)
    const [ fileName, setFileName ] = React.useState<string>('')
    const [ shareLink, setShareLink ] = React.useState<string>('')
    const [ order, setOrder ] = React.useState<number>(0)


    function deleteFile() {
        if (fileForAction) {
            Inertia.delete(`/api/files/${fileForAction.id}`, {
                preserveScroll: true
            })
        }
    }

    function renameFile(nameForAction: string=fileName) {
        if (fileForAction && fileName) {
            Inertia.put(`/api/files/${fileForAction.id}`, {name: nameForAction}, {
                preserveScroll: true
            })
        }
    }

    function updateName(newName: string) {
        if (!newName) return

        setFileName(newName.replace(/\s/g, ''))
    }

    function reorderFile(orderForAction: number = order) {
        if (!fileForAction) return
        if (orderForAction === fileForAction.order) return
        
        Inertia.put(`/api/files/${fileForAction.id}`, {order: orderForAction}, {
            preserveScroll: true
        })
    }

    function updateOrder(newOrder: number) {
        if (typeof newOrder !== 'number') return

        setOrder(newOrder ?? 21230123123)
    }

    function updateFile(newFile: ReceivedFileType = file) {
        if (!newFile) return

        setFileForAction(newFile)
        setShareLink(newFile.shareLink)
        setFileName(newFile.name)
    }

    function updateShareLink(newShareLink: ShareLinkType) {
        if (newShareLink) setShareLink(newShareLink.replace(/\s/g, ''))
        else setShareLink('')
    }

    function shareFile(shareLinkForAction: ShareLinkType=shareLink) {
        if (fileForAction) {
            Inertia.put(`/api/files/${fileForAction.id}`, {shareLink: shareLinkForAction ?? null}, {
                preserveScroll: true
            })
        }
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
        setOrder(file.order)
    }, [file])

    return {
        reorderFile,
        updateFile,
        deleteFile,
        renameFile,
        shareFile,
        updateName,
        updateOrder,
        updateShareLink,
        copyShareLink,
        file: fileForAction,
        shareLink,
        fileName,
        order
    }
}