// global
import React from 'react'
// layout
import PageLayout from '../Layouts/PageLayout';
// components
import FileBgByType from '../Components/FileBgByType';
// store
import { useAppDispatch } from '../store/hooks';
import useFileApi from '../libs/useFileApi';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';


interface Props {
    user: RequestUserType,
    file: IFile
}

export default function FilePage({user, file}: Props) {
    const dispatch = useAppDispatch()
    const fileApi = useFileApi(file, dispatch)

    return (
        <PageLayout user={user}>
            <div className="file-controll-btns">
                <button className="file-controll-btns__btn">Rename</button>
                <button className="file-controll-btns__btn">Delete</button>
                <button className="file-controll-btns__btn">Full Size</button>
            </div>
            <div className="file-info">
                <FileBgByType file={file} className='file-info__bg' />
                <h1 className="file-info__name">{file.name}</h1>
                <h3 className="file-info__size">{file.size}</h3>
            </div>
            <div className="main-btns">
                <button className="main-btns__btn">Stop Sharing</button>
                <a href={file.path} download={file.name}>
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    Download
                </a>
            </div>
        </PageLayout>
    )
}