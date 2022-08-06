// global
import React from 'react'
// layouts
import { RClickWindowLayout } from '../Layouts/RClickWindowLayout';
// libs
import getFileToDipslayLink from '../libs/getFileToDipslayLink';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeNameFileToUpload, removeFileToUpload } from '../store/slices/filesSlice';
import { closeFileToUploadWindow } from '../store/slices/rClickWindowsSlice';
// components
import { ConfirmWindowLayout } from '../Layouts/ConfirmWindowLayout';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faArrowLeftLong, faXmark } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export const RClickFileToUploadWindow = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const dispatch = useAppDispatch()
    const { clickedFileToUploadData, fileToUploadWindowPosition } = useAppSelector(state => state.windows)
    const [ toDisplayLink, setToDisplayLink ] = React.useState<string>('')
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ fileName, setFileName ] = React.useState<string>('')
    
    React.useEffect(() => {
        if (clickedFileToUploadData.file) {
            setFileName(clickedFileToUploadData.file.name)
        }
        
    }, [clickedFileToUploadData.file?.name])

    React.useEffect(() => {
        if (clickedFileToUploadData.file) {
            const newLink = getFileToDipslayLink(clickedFileToUploadData.file)

            setToDisplayLink(newLink)
        }
    }, [clickedFileToUploadData.file])

    const renameHandler = () => {
        dispatch(changeNameFileToUpload({
            fileId: clickedFileToUploadData.fileIndex,
            name: fileName
        }))
        dispatch(closeFileToUploadWindow())
    }

    const removeHandler = () => {
        if (clickedFileToUploadData.fileIndex === null) return

        dispatch(removeFileToUpload(clickedFileToUploadData.fileIndex))
        dispatch(closeFileToUploadWindow())
    }

    const closeWindow = () => {
        dispatch(closeFileToUploadWindow())
    }

    return (
        <RClickWindowLayout ref={ref} posX={fileToUploadWindowPosition.posX} posY={fileToUploadWindowPosition.posY}>
            { isRenameWindowOpened &&
                <ConfirmWindowLayout
                    confirm={renameHandler}
                    confirmButtonText="Rename"
                    cancel={closeWindow}
                >
                    <input value={fileName} placeholder='File Name' className='confirm-window__input' type="text" onChange={e => setFileName(e.target.value)} />
                </ConfirmWindowLayout>
            }
            <ul className="btns">
                <li>
                    <a target={'_blank'} href={toDisplayLink}>
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