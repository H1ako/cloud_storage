interface IFileApi {
    updateFile: (file?: ReceivedFileType) => void,
    updateOrder: (newOrder: number) => void,
    deleteFile: () => void,
    renameFile: (nameForAction?: string) => void,
    shareFile: (shareLinkForAction?: ShareLinkType) => void,
    updateName: (newName: string) => void,
    updateShareLink: (newLink: ShareLinkType) => void,
    copyShareLink: () => void,
    reorderFile: (orderForAction?: number) => void,
    file: ReceivedFileType,
    shareLink: string,
    fileName: string,
    order: number
}

interface IFileToUploadApi {
    updateFile: (newFile?: ReceivedFileToUploadType) => void,
    removeFile: (fileIndexForAction?: number) => void,
    renameFile: (newName?: string) => void,
    updateName: (newName: string) => void,
    updateDisplayLink: (fileToDisplay?: ReceivedFileToUploadType) => void,
    updateIndex: (newIndex: number) => void,
    file: ReceivedFileToUploadType,
    fileIndex: number,
    fileName: string,
    displayLink: string
}