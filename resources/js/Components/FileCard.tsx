// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// components
import FileBgByType from './FileBgByType';
// store
import { useAppDispatch } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';


interface Props {
    file: IFile,
    fileIndex: number
}

export default function FileCard({ file, fileIndex }: Props) {
    const dispatch = useAppDispatch()

    const rClickHandler = (e: React.MouseEvent) => {
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
            <Link className={file.shareLink ?? 'no-link'} href={file.shareLink ? `/files/${file.shareLink}` : ''}>
                <FileBgByType className='file-card__bg' file={file} />
                <div className="file-card__info">
                    { file.shareLink &&
                        <h5 className="info__share-status">Shared</h5>
                    }
                    <h3 className="info__name">{file.name}</h3>
                    <h4 className="info__size">{file.size}</h4>
                </div>
            </Link>
        </li>
    )
}