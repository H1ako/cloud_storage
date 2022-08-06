interface IUseFileApiReturned {
    updateFile: (file?: ReceivedFileType) => void,
    deleteFile: () => void,
    renameFile: (nameForAction?: string) => void,
    shareFile: (shareLinkForAction?: ShareLinkType) => void,
    updateName: (newName: string) => void,
    updateShareLink: (newLink: ShareLinkType) => void,
    copyShareLink: () => void,
    file: ReceivedFileType,
    shareLink: string,
    fileName: string
}