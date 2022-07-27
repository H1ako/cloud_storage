// global
import React from 'react'
// store
import { useAppDispatch } from '../store/hooks';
import { updateFilesToUpload } from '../store/slices/filesSlice';


export default React.memo(function UploadBtn() {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const uploadedFiles: FileListType = e.target.files ?? []

        dispatch(updateFilesToUpload(uploadedFiles))
    }

    return (
        <label className="upload-btn">
            Upload
            <input type="file" multiple onChange={uploadHandler} />
        </label>
    )
})