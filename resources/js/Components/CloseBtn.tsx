// global
import React from 'react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


interface Props {
    onClose: () => void
}

export default function CloseBtn({onClose}: Props) {
    return (
        <button onClick={onClose} className='close-btn'>
            <FontAwesomeIcon icon={faXmark} />
        </button>
    )
}