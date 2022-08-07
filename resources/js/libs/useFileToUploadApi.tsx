// global
import React from 'react';
// store
import { useAppDispatch } from '../store/hooks';
import { changeNameFileToUpload, removeFileToUpload } from '../store/slices/filesSlice';
import getFileToDipslayLink from './getFileToDipslayLink';


export default function useFileToUploadApi(file: ReceivedFileToUploadType, index: number): IFileToUploadApi {
    const dispatch = useAppDispatch()
    const [ fileForAction, setFileForAction ] = React.useState<ReceivedFileToUploadType>(null)
    const [ fileName, setFileName ] = React.useState<string>('')
    const [ fileIndex, setFileIndex ] = React.useState<number>(-1)
    const [ displayLink, setDisplayLink ] = React.useState<string>('')


    function removeFile(fileIndexForAction: number = fileIndex) {
        if (fileIndexForAction === -1) return

        dispatch(removeFileToUpload(fileIndexForAction))
    }

    function updateFile(newFile: ReceivedFileToUploadType = fileForAction) {
        if (!newFile) return

        setFileForAction(newFile)
        updateName(newFile.name)
        updateDisplayLink(newFile)
    }

    function renameFile(newName: string = fileName) {
        if (!newName) return

        dispatch(changeNameFileToUpload({
            fileId: fileIndex,
            name: fileName
        }))
    }

    function updateName(newName: string) {
        if (!newName) return

        setFileName(newName.replace(/\s/g, ''))
    }

    function updateIndex(newIndex: number) {
        setFileIndex(newIndex)
    }

    function updateDisplayLink(fileToDisplay: ReceivedFileToUploadType = fileForAction) {
        if (!fileToDisplay) return

        const newLink = getFileToDipslayLink(fileToDisplay)

        setDisplayLink(newLink)
    }

    
    React.useEffect(() => {
        updateFile(file)
        updateIndex(index)
    }, [file])

    return {
        updateFile,
        removeFile,
        renameFile,
        updateName,
        updateIndex,
        file: fileForAction,
        fileIndex,
        fileName,
        displayLink,
        updateDisplayLink
    }
}