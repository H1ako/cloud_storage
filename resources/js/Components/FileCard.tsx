// global
import React from 'react'
// components
import FileCardBg from './FileCardBg';


interface Props {
    file: IFile,
}

export default function FileCard(props: Props) {
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