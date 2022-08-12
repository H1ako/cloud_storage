// global
import React from 'react'
// layouts
import { RClickWindowLayout } from '../Layouts/RClickWindowLayout';
// libs
import useFileToUploadApi from '../libs/useFileToUploadApi';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileToUploadWindow } from '../store/slices/rClickWindowsSlice';
// components
import { RenameWindow } from './RenameWindow';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faArrowLeftLong, faXmark } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export const RClickFileToUploadWindow = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const dispatch = useAppDispatch()
    const { clickedFileToUploadData, fileToUploadWindowPosition } = useAppSelector(state => state.windows)
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const fileApi = useFileToUploadApi(clickedFileToUploadData.file, clickedFileToUploadData.fileIndex)


    const closeWindow = () => {
        dispatch(closeFileToUploadWindow())
    }
    
    const removeHandler = () => {
        fileApi.removeFile()
        closeWindow()
    }


    return (
        <RClickWindowLayout ref={ref} posX={fileToUploadWindowPosition.x} posY={fileToUploadWindowPosition.y}>
            { isRenameWindowOpened &&
                <RenameWindow fileApi={fileApi} closeWindow={closeWindow} />
            }
            <ul className="btns">
                <li>
                    <a target={'_blank'} href={fileApi.displayLink}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                        Open
                    </a>
                </li>
                <li>
                    <button onClick={() => setIsRenameWindowOpened(true)}>
                        <FontAwesomeIcon icon={faFileSignature} />
                        Rename
                    </button>
                </li>
                <li>
                    <button onClick={removeHandler}>
                        <FontAwesomeIcon icon={faXmark} />
                        Remove
                    </button>
                </li>
            </ul>
        </RClickWindowLayout>
    )
})