// global
import React from 'react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FileBgByType from './FileBgByType';


interface Props {
    file: IFile
}

export default function FileResult({ file }: Props) {
    return (
        <div className='file-result'>
            <FileBgByType className='file-result__bg' file={file} />
            <div className="file-result__info">
                <h4 className="info__name">{file.name}</h4>
                <h5 className="info__size">{file.size}</h5>
            </div>
        </div>
    )
}