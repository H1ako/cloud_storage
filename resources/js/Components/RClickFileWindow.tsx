// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// layouts
import { RClickWindowLayout } from '../Layouts/RClickWindowLayout';
// components
import { DeleteConfirmWindow } from './DeleteConfirmWindow';
import { ShareLinkWindow } from './ShareLinkWindow';
import { RenameWindow } from './RenameWindow';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faFileSignature, faShareFromSquare, faTrash, faFileArrowDown, faLink, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
// libs
import useFileApi from '../libs/useFileApi';


type Props = {}

export const RClickFileWindow = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const dispatch = useAppDispatch()
    const { clickedFileData, fileWindowPosition } = useAppSelector(state => state.windows)
    const fileApi = useFileApi(clickedFileData.file)
    // windows open state
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ isShareLinkWindowOpened, setIsShareLinkWindowOpened ] = React.useState<boolean>(false)
    const [ isDeleteConfirmWindowOpened, setIsDeleteConfirmWindowOpened ] = React.useState<boolean>(false)
    
    const closeWindow = () => {
        dispatch(closeFileWindow())
    }


    React.useEffect(() => {
        fileApi.updateFile(clickedFileData.file)
    }, [clickedFileData.file])
    
    return (
        <RClickWindowLayout ref={ref} posX={fileWindowPosition.posX} posY={fileWindowPosition.posY}>
            { isShareLinkWindowOpened &&
                <ShareLinkWindow fileApi={fileApi} closeWindow={closeWindow} />
            }
            { isRenameWindowOpened &&
                <RenameWindow fileApi={fileApi} closeWindow={closeWindow} />
            }
            { isDeleteConfirmWindowOpened &&
                <DeleteConfirmWindow fileApi={fileApi} closeWindow={closeWindow} />
            }
            <ul>
                { fileApi.file?.shareLink &&
                    <li>
                        <Link onClick={closeWindow} href={`/files/${fileApi.shareLink}`}>
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            Open
                        </Link>
                    </li>
                }
                <li>
                    <a target={'_blank'} onClick={closeWindow} href={clickedFileData.file?.path}>
                        <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                        Full Size
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