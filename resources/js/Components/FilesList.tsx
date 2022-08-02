// global
import React from 'react'
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// components
import FileCard from './FileCard';
import { RClickFileWindow } from './RClickFileWindow';
// layouts
import { ClickOutsideLayout } from '../Layouts/ClickOutsideLayout';


export default function FilesList() {
    const dispatch = useAppDispatch()
    const { files } = useAppSelector(state => state.files)
    const { isFileWindowOpened } = useAppSelector(state => state.windows)
    const fileWindowRef = React.createRef<HTMLDivElement>()

    const clickOutsideHandler = () => {
        dispatch(closeFileWindow())
    }

    return (
        <ul className='files-list'>
            { isFileWindowOpened &&
                <ClickOutsideLayout ref={fileWindowRef} onClick={clickOutsideHandler}>
                    <RClickFileWindow />
                </ClickOutsideLayout>
            }
            {files.map((file, id) => (
                <FileCard key={`file-${id}`} fileIndex={id} file={file} />
            ))}
        </ul>
    )
}