// global
import React from 'react'
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFilesToUpload, updateFilesToUpload } from '../store/slices/filesSlice';


interface Props {
    textInside?: string,
    action?: 'add' | 'set'
}

export default React.memo(function UploadBtn({textInside='Upload', action='set'}: Props) {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.user)

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || user === null) return
        
        const uploadedFiles: FileListType = e.target.files
        // total size
        let filesTotalSize = 0
        for(const file of uploadedFiles) {
            filesTotalSize += file.size
        }
        if (user.spaceData.usedSpace + filesTotalSize > user.spaceData.maxSpace) return

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