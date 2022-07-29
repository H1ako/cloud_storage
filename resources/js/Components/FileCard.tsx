// global
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileZipper } from '@fortawesome/free-solid-svg-icons';


interface Props {
    file: IFile,
}

function FileBg(props: Props) {
    const { file } = props

    switch (file.type) {
        case 'video':
            return (
                <div className="file-card__bg">
                    <img src={file.path} alt="" />
                </div>
            )
            
        case 'image':
            return (
                <div className="file-card__bg">
                    <img src={file.path} alt="" />
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
            <div className="file-card__info">
                <h2 className="info__name">{file.name}</h2>
                <h3 className="info__size">{file.size}</h3>
            </div>
        </li>
    )
}