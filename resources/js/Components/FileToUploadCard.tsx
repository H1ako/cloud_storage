// global
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import FileCardBg from './FileCardBg';


interface Props {
    file: File,
}

export default function FileToUploadCard(props: Props) {
    const { file } = props

    return (
        <li className='file-card'>
            <FileCardBg file={file} />
            <div className="file-card__info">
                <h3 className="info__name">{file.name}</h3>
                <h4 className="info__size">{file.size}</h4>
            </div>
        </li>
    )
}