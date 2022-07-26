// global
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';


export default function UploadFileBlock() {
    const [file, setFile] = React.useState<File | null | undefined>(null)

    return (
        <div className="upload-container">
            <label className="upload-file-block" htmlFor='upload-file-block'>
                <FontAwesomeIcon className='upload-file-block__icon' icon={faFileArrowDown} />
                <h1>Press or Hover the File to Upload</h1>
            </label>
            <input type="file" id='upload-file-block' onChange={e => setFile(e.target?.files?.[0])} />
        </div>
    )
}