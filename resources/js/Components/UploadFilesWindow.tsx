// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// components
import WindowLayout from '../Layouts/WindowLayout';
import FilesToUploadList from './FilesToUploadList';
import UploadBtn from './UploadBtn';
import CloseBtn from './CloseBtn';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFilesToUploadWindow } from '../store/slices/filesSlice';
// windows
import RClickFileToUploadWindow from './RClickFileToUploadWindow';


export default function UploadFilesWindow() {
    const dispatch = useAppDispatch()
    const { filesToUpload } = useAppSelector(state => state.files)
    const { isFileToUploadWindowOpened } = useAppSelector(state => state.windows)
    

    const closeWindow = (): void => {
        dispatch(closeFilesToUploadWindow())
    }

    const clickOutsideHandler = (e: MouseEvent) => {
        if (!isFileToUploadWindowOpened) return

        // if (RClickWindowRef.current && !RClickWindowRef.current.contains(e.target)) {
        //     console.log(123)
        // }

        // if (e.target)
    }

    React.useEffect(() => {
        document.addEventListener('mouseup', clickOutsideHandler)

        return document.removeEventListener('mouseup', clickOutsideHandler)
    })

    return (
        <WindowLayout>
            { isFileToUploadWindowOpened &&
                <RClickFileToUploadWindow />
            }
            <CloseBtn onClose={closeWindow} />
            <div className="upload-files-window">
                <FilesToUploadList />
                <div className="upload-files-window__btns">
                    <Link
                        onClick={closeWindow}
                        className='btns__upload'
                        href='/api/files'
                        type='button'
                        data={{files: filesToUpload}}
                        as='button'
                        method='post'
                    >
                        Upload
                    </Link>
                    <UploadBtn textInside='Add More' action='add' />
                </div>
            </div>
        </WindowLayout>
    )
}