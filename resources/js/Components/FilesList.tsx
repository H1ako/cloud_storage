// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import FileCard from './FileCard';


export default function FilesList() {
    const { files } = useAppSelector(state => state.files)

    return (
        <ul className='files-list'>
            {files.map(file => (
                <FileCard file={file} />
            ))}
        </ul>
    )
}