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
    const picture = file instanceof File ? getFileToDipslayLink(file) : file.displayPath

    switch (file.type.split('/')[0]) {
        case 'video':
            return (
                <div className={className}>
                    <video className='bg__content' draggable='false' src={picture} controls />
                </div>
            )
            
        case 'image':
            return (
                <div className={className}>
                    <img className='bg__content' draggable='false' src={picture} alt="" />
                </div>
            )
        case 'application':
            return (
                <div className={className}>
                    <FontAwesomeIcon className='bg__content' icon={faFileZipper} />
                </div>
            )
        case 'text':
            return (
                <div className={className}>
                    <FontAwesomeIcon className='bg__content' icon={faFileLines} />
                </div>
            )
        default:
            return (
                <div className={className}>
                    <FontAwesomeIcon className='bg__content' icon={faFile} />
                </div>
            )
    }
}