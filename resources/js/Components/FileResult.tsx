// global
import React from 'react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FileBgByType from './FileBgByType';
import { Link } from '@inertiajs/inertia-react';


interface Props {
    file: IFile
}

export default function FileResult({ file }: Props) {
    return (
        <li className='file-result'>
            <Link href={`/files/${file.shareLink}`}>
                <FileBgByType className='file-result__bg' file={file} />
                <div className="file-result__info">
                    <h3 className="info__name">{file.name}</h3>
                    <h5 className="info__size">{file.size}</h5>
                </div>
            </Link>
        </li>
    )
}