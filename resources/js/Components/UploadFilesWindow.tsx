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


export default function UploadFilesWindow() {
    const dispatch = useAppDispatch()
    const { filesToUpload } = useAppSelector(state => state.files)

    const onCloseHandler = (): void => {
        dispatch(closeFilesToUploadWindow())
    }

    return (
        <WindowLayout>
            <CloseBtn onClose={onCloseHandler} />
            <div className="upload-files-window">
                <FilesToUploadList />
                <div className="upload-files-window__btns">
                    <Link className='btns__upload' href='/files' type='button' data={{files: filesToUpload}} as='button' method='post'>Upload</Link>
                    <UploadBtn textInside='Add More' action='add' />
                </div>
            </div>
        </WindowLayout>
    )
}