// global
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileZipper } from '@fortawesome/free-solid-svg-icons';

interface Props {
    file: IFile
}

function FileBg(props: Props) {
    const { file } = props

    switch (file.type) {
        case 'video':
            return (
                <div className="file-card__bg">
                    <img src={file.file} alt="" />
                </div>
            )
            
        case 'image':
            return (
                <div className="file-card__bg">
                    <img src={file.file} alt="" />
                </div>
            )
        case 'archive':
            return (
                <div className="file-card__bg">
                    <FontAwesomeIcon icon={faFileZipper} />
                </div>
            )
        case 'other':
            return (
                <div className="file-card__bg">
                    <FontAwesomeIcon icon={faFile} />
                </div>
            )
        default:
            return (
                <div className="file-card__bg">
                    <FontAwesomeIcon icon={faFile} />
                </div>
            )
    }
}

export default function FileCard(props: Props) {
    const { file } = props

    return (
        <li className='file-card'>
            <FileBg file={file} />
            <h3 className="file-card__name">{file.name}</h3>
            <h4 className="file-card__size">{file.size}</h4>
        </li>
    )
}