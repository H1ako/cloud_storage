// global
import React from 'react'

interface Props {
    file: File
}

export default function FilesList(props: Props) {
    const { file } = props

    return (
        <li className='file-card'>
            <h3 className="file-card__name">{file.name}</h3>
            <h4 className="file-card__size">{file.size}</h4>
        </li>
    )
}