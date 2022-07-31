// global
import React from 'react'
// components
import FileCardBg from './FileCardBg';
import { useAppDispatch } from '../store/hooks';
import { openFileToUploadWindow } from '../store/slices/rClickWindowsSlice';


interface Props {
    file: File,
    fileId: number
}

export default function FileToUploadCard({ file, fileId }: Props) {
    const dispatch = useAppDispatch()

    const rClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        // if pressed button is not right
        e.preventDefault()
        if (e.button !== 2) return
        

        dispatch(openFileToUploadWindow({
            position: {
                posX: e.clientX,
                posY: e.clientY
            },
            fileData: {
                file: file,
                fileId: fileId
            }
        }))
    }

    return (
        <li className='file-card' onContextMenu={rClickHandler}>
            <FileCardBg file={file} />
            <div className="file-card__info">
                <h3 className="info__name">{file.name}</h3>
                <h4 className="info__size">{file.size}</h4>
            </div>
        </li>
    )
}