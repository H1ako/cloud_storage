// global
import React from 'react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileLines, faFileZipper } from '@fortawesome/free-solid-svg-icons';
// libs
import getFileToDipslayLink from '../libs/getFileToDipslayLink';


interface Props {
    file: File | IFile,
    className?: string
}

export default function FileBgByType({ file, className }: Props) {
    const picture = file instanceof File ? getFileToDipslayLink(file) : file.path

    switch (file.type.split('/')[0]) {
        case 'video':
            return (
                <div className={className}>
                    <img src={picture} alt="" />
                </div>
            )
            
        case 'image':
            return (
                <div className={className}>
                    <img src={picture} alt="" />
                </div>
            )
        case 'application':
            return (
                <div className={className}>
                    <FontAwesomeIcon icon={faFileZipper} />
                </div>
            )
        case 'text':
            return (
                <div className={className}>
                    <FontAwesomeIcon icon={faFileLines} />
                </div>
            )
        default:
            return (
                <div className={className}>
                    <FontAwesomeIcon icon={faFile} />
                </div>
            )
    }
}