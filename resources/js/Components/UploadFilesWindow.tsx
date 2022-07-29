// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// components
import WindowLayout from '../Layouts/WindowLayout';
import FilesToUploadList from './FilesToUploadList';
// store
import { useAppSelector } from '../store/hooks';


export default function UploadFilesWindow() {
    const { filesToUpload } = useAppSelector(state => state.files)

    return (
        <WindowLayout>
            <div className="upload-files-window">
                <FilesToUploadList />
                <Link href='/files' type='button' data={{files: filesToUpload}} as='button' method='post'></Link>
            </div>
        </WindowLayout>
    )
}