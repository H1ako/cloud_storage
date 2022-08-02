// global
import React from 'react'
// layouts
import { RClickWindowLayout } from '../Layouts/RClickWindowLayout';
import WindowLayout from '../Layouts/WindowLayout';
// components
import { RenameWindow } from './RenameWindow';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faFileSignature, faShareFromSquare, faTrash, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export const RClickFileWindow = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
    const dispatch = useAppDispatch()
    const { clickedFileData, fileWindowPosition } = useAppSelector(state => state.windows)
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ isDeleteConfirmWindowOpened, setIsDeleteConfirmWindowOpened ] = React.useState<boolean>(false)
    const [ fileName, setFileName ] = React.useState<string>('')

    const changeNameHandler = (e: React.MouseEvent) => {

        dispatch(closeFileWindow())
    }

    React.useEffect(() => {
        if (clickedFileData.file) {
            setFileName(clickedFileData.file.name)
        }
    }, [clickedFileData.file?.name])

    return (
        <RClickWindowLayout ref={ref} posX={fileWindowPosition.posX} posY={fileWindowPosition.posY}>
            { isRenameWindowOpened &&
                <RenameWindow name={fileName} setName={setFileName} cancel={() => setIsRenameWindowOpened(false)} changeNameConfirm={changeNameHandler} />
            }
            { isDeleteConfirmWindowOpened &&
                <WindowLayout>
                    <div className="delete-window"></div>
                </WindowLayout>                
            }
            <ul>
                <li>
                    <a target={'_blank'} href={clickedFileData.file?.path}>
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
                    <button>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        Share
                    </button>
                </li>
                <li>
                    <button>
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                    </button>
                </li>
                <li>
                    <button>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                        Download
                    </button>
                </li>
            </ul>
        </RClickWindowLayout>
    )
})