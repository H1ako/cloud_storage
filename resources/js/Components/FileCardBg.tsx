// global
import React from 'react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileLines, faFileZipper } from '@fortawesome/free-solid-svg-icons';
// libs
import getFileToDipslayLink from '../libs/getFileToDipslayLink';


interface Props {
    file: File | IFile,
}

export default function FileCardBg(props: Props) {
    const { file } = props
    const picture = file instanceof File ? getFileToDipslayLink(file) : file.path

    switch (file.type.split('/')[0]) {
        case 'video':
            return (
                <div className="file-card__bg">
                    <img src={picture} alt="" />
                </div>
            )
            
        case 'image':
            return (
                <div className="file-card__bg">
                    <img src={picture} alt="" />
                </div>
            )
        case 'application':
            return (
                <div className="file-card__bg">
                    <FontAwesomeIcon icon={faFileZipper} />
                </div>
            )
        case 'text':
            return (
                <div className="file-card__bg">
                    <FontAwesomeIcon icon={faFileLines} />
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