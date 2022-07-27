// global
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
// store
import { useAppDispatch } from '../store/hooks';
import { updateFilesToUpload } from '../store/slices/filesSlice';


export default function UploadFileBlock() {
    const dispatch = useAppDispatch()
    const [ isDragging, setIsDragging ] = React.useState<boolean>(false)

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const uploadedFiles: FileListType = e.target.files ?? []

        dispatch(updateFilesToUpload(uploadedFiles))
    }

    const dropFileHandler = (e: React.DragEvent): void => {
        e.stopPropagation();
        e.preventDefault()

        const uploadedFiles: FileListType = e.dataTransfer.files ?? []

        dispatch(updateFilesToUpload(uploadedFiles))
        setIsDragging(false)
    }

    const dragOverHandler = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <div
            onDrop={dropFileHandler}
            onDragOver={dragOverHandler}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            className={`upload-container${isDragging ? ' active' : ''}`}
        >
            <label className="upload-file-block" htmlFor='upload-file-block'>
                <FontAwesomeIcon className='upload-file-block__icon' icon={faFileArrowDown} />
                <h1>Press or Hover the File to Upload</h1>
            </label>
            <input type="file" multiple id='upload-file-block' onChange={uploadHandler} />
        </div>
    )
}