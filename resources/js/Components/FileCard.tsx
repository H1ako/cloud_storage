// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// components
import FileCardBg from './FileCardBg';
// store
import { useAppDispatch } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';


interface Props {
    file: IFile,
    fileIndex: number
}

export default function FileCard({ file, fileIndex }: Props) {
    const dispatch = useAppDispatch()

    const rClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        // if pressed button is not right
        e.preventDefault()
        if (e.button !== 2) return

        dispatch(openFileWindow({
            position: {
                posX: e.clientX,
                posY: e.clientY
            },
            fileData: {
                file: file,
                fileIndex: fileIndex
            }
        }))
    }

    return (
        <li className='file-card' onContextMenu={rClickHandler}>
            <Link href={file.shareLink ? `/files/${file.shareLink}` : '#'}>
                <FileCardBg file={file} />
                <div className="file-card__info">
                    <h3 className="info__name">{file.name}</h3>
                    <h4 className="info__size">{file.size}</h4>
                </div>
            </Link>
        </li>
    )
}