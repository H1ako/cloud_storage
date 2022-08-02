// global
import React from 'react'
// store
import { useAppDispatch } from '../store/hooks';
import { addFilesToUpload, updateFilesToUpload } from '../store/slices/filesSlice';


interface Props {
    textInside?: string,
    action?: 'add' | 'set'
}

export default React.memo(function UploadBtn({textInside='Upload', action='set'}: Props) {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return
        
        const uploadedFiles: FileListType = e.target.files

        if (action === 'add') {
            dispatch(addFilesToUpload(uploadedFiles))
            return
        }
        dispatch(updateFilesToUpload(uploadedFiles))
    }

    return (
        <label className="upload-btn">
            {textInside}
            <input type="file" multiple onChange={uploadHandler} />
        </label>
    )
})