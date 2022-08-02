// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import FileToUploadCard from './FileToUploadCard';


export default function FilesToUploadList() {
    const { filesToUpload } = useAppSelector(state => state.files)

    return (
        <ul className='files-list'>
            {filesToUpload.map((file, id) => (
                <FileToUploadCard key={`up-file-${id}`} fileIndex={id} file={file} />
            ))}
        </ul>
    )
}