// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';
// layouts
import { RClickWindowLayout } from '../Layouts/RClickWindowLayout';
// components
import { ConfirmWindow } from './ConfirmWindow';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faFileSignature, faShareFromSquare, faTrash, faFileArrowDown, faLink } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export const RClickFileWindow = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const dispatch = useAppDispatch()
    const { clickedFileData, fileWindowPosition } = useAppSelector(state => state.windows)
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ isShareLinkWindowOpened, setIsShareLinkWindowOpened ] = React.useState<boolean>(false)
    const [ isDeleteConfirmWindowOpened, setIsDeleteConfirmWindowOpened ] = React.useState<boolean>(false)
    const [ fileName, setFileName ] = React.useState<string>('')
    const [ shareLink, setShareLink ] = React.useState<string>('')


    const renameHandler = () => {
        if (clickedFileData.file && fileName) {
            Inertia.put(`/api/files/${clickedFileData.file.id}`, {name: fileName})
        }
        dispatch(closeFileWindow())
    }

    const deleteHandler = () => {
        if (clickedFileData.file) {
            Inertia.delete(`/api/files/${clickedFileData.file.id}`)
        }
        dispatch(closeFileWindow())
    }

    const shareLinkHandler = () => {
        if (clickedFileData.file) {
            Inertia.put(`/api/files/${clickedFileData.file.id}`, {shareLink: shareLink})
        }
        dispatch(closeFileWindow())
    }

    const copyShareLink = () => {
        if (!clickedFileData.file) return

        const origin = window.location.origin
        const link = `${origin}/files/${clickedFileData.file.shareLink}`

        navigator.clipboard.writeText(link)
    }

    const closeWindow = () => {
        dispatch(closeFileWindow())
    }


    React.useEffect(() => {
        if (clickedFileData.file && clickedFileData.file.name) {
            setFileName(clickedFileData.file.name)
        }
    }, [clickedFileData.file?.name])

    React.useEffect(() => {
        if (clickedFileData.file && clickedFileData.file.shareLink) {
            setShareLink(clickedFileData.file.shareLink)
        }
    }, [clickedFileData.file?.shareLink])

    
    return (
        <RClickWindowLayout ref={ref} posX={fileWindowPosition.posX} posY={fileWindowPosition.posY}>
            { isShareLinkWindowOpened &&
                <ConfirmWindow
                    confirm={shareLinkHandler}
                    confirmButtonText={shareLink ? 'Share' : 'Stop Sharing'}
                    cancel={closeWindow}
                >
                    <div className="flex">
                        <label htmlFor="share-link-input">{window.location.origin}/files/</label>
                        <input value={shareLink} id='share-link-input' placeholder='Share Link' className='confirm-window__input text-start' type="text" onChange={e => setShareLink(e.target.value)} />
                        <button className="confirm-window__btn copy-link" onClick={copyShareLink}>
                            <FontAwesomeIcon icon={faLink} />
                            Copy
                        </button>
                    </div>
                </ConfirmWindow>
            }
            { isRenameWindowOpened &&
                <ConfirmWindow
                    confirm={renameHandler}
                    confirmButtonText="Rename"
                    cancel={closeWindow}
                >
                    <input value={fileName} placeholder='File Name' className='confirm-window__input' type="text" onChange={e => setFileName(e.target.value)} />
                </ConfirmWindow>
            }
            { isDeleteConfirmWindowOpened &&
                <ConfirmWindow
                    confirm={deleteHandler}
                    confirmButtonText='Delete'
                    cancel={closeWindow}
                >
                    <h3 className="confirm-window__heading">Are you sure you want to Delete this File?</h3>
                </ConfirmWindow>
            }
            <ul>
                <li>
                    <a target={'_blank'} onClick={() => dispatch(closeFileWindow())} href={clickedFileData.file?.path}>
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
                    <button onClick={() => setIsShareLinkWindowOpened(true)}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        Share
                    </button>
                </li>
                <li>
                    <button onClick={() => setIsDeleteConfirmWindowOpened(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </button>
                </li>
                <li>
                    <a href={clickedFileData.file?.path} download={clickedFileData.file?.name}>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                        Download
                    </a>
                </li>
            </ul>
        </RClickWindowLayout>
    )
})