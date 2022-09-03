// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// components
import FileBgByType from './FileBgByType';


interface Props {
    file: IFile
}

export default function FileResult({ file }: Props) {
    return (
        <li className='file-result'>
            <Link href={`/files/${file.shareLink}`} preserveState>
                <FileBgByType className='file-result__bg' file={file} />
                <div className="file-result__info">
                    <h4 className="info__share-link">{file.shareLink}</h4>
                    <h3 className="info__name">{file.name}</h3>
                    <h5 className="info__size">{file.displaySize}</h5>
                </div>
                <div className="file-result__user-info">
                    <h3 className="user-info__email">{file.user?.email}</h3>
                </div>
            </Link>
        </li>
    )
}