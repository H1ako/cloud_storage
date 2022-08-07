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
import { RClickFileToUploadWindow } from './RClickFileToUploadWindow';
import { ClickOutsideLayout } from '../Layouts/ClickOutsideLayout';
import { closeFileToUploadWindow } from '../store/slices/rClickWindowsSlice';


export default function UploadFilesWindow() {
    const dispatch = useAppDispatch()
    const { filesToUpload } = useAppSelector(state => state.files)
    const { isFileToUploadWindowOpened } = useAppSelector(state => state.windows)
    const fileToUploadWindowRef = React.createRef<HTMLDivElement>()    

    const closeWindow = (): void => {
        dispatch(closeFilesToUploadWindow())
    }

    const clickOutsideHandler = (e: MouseEvent) => {
        if (!isFileToUploadWindowOpened) return

        dispatch(closeFileToUploadWindow())
    }

    return (
        <WindowLayout>
            { isFileToUploadWindowOpened &&
                <ClickOutsideLayout ref={fileToUploadWindowRef} onClick={clickOutsideHandler}>
                    <RClickFileToUploadWindow />
                </ClickOutsideLayout>
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
                        preserveScroll={true}
                    >
                        Upload
                    </Link>
                    <UploadBtn textInside='Add More' action='add' />
                </div>
            </div>
        </WindowLayout>
    )
}