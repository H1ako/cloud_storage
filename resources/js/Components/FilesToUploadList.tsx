// global
import React from 'react'
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';


export default function FilesToUploadList() {
    const dispatch = useAppDispatch()
    const { filesToUpload } = useAppSelector(state => state.files)

    return (
        <ul className='files-to-upload-list'>
            {filesToUpload.map(file => (
                <li className='to-upload-file'>
                    button.file-card__
                    <div className="to-upload-file__bg">
                        <FontAwesomeIcon icon={faFile} />
                    </div>
                    <div className="to-upload-file__info">
                        <input className="info__name">{file.name}</input>
                        <h3 className="info__size">{file.size}</h3>
                    </div>
                </li>
            ))}
        </ul>
    )
}