// global
import React from 'react'
import Draggable, {DraggableEventHandler} from 'react-draggable';
// components
import FileBgByType from './FileBgByType';
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';
import { updateDraggingFileId, updateDraggingFileToMoveOrder } from '../store/slices/filesSlice';
// libs
import useFileApi from '../libs/useFileApi';


interface Props {
    file: IFile,
    fileIndex: number,
    orderCardRef: React.RefObject<HTMLDivElement>
}

export default function FileCard({ file, fileIndex, orderCardRef }: Props) {
    const dispatch = useAppDispatch()
    const { files } = useAppSelector(state => state.files)
    const { draggingFileId, draggingFileToMoveOrder } = useAppSelector(state => state.files)
    const [ position, setPosition ] = React.useState<IPosition>({
        x: 0,
        y: 0
    })
    const [ isFileDragged, setIsFileDragged ] = React.useState<boolean>(false)
    const fileApi = useFileApi(file)
    const ref = React.useRef<HTMLLIElement>(null)

    const rClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        // if pressed button is not right
        if (e.button !== 2) return

        dispatch(openFileWindow({
            position: {
                x: e.clientX,
                y: e.clientY
            },
            fileData: {
                file: file,
                fileIndex: fileIndex
            }
        }))
    }

    const startDraggingHandler = () => {
        if (!ref.current) return false

        // setting start position
        setPosition({
            x: ref.current.offsetLeft,
            y: ref.current.offsetTop
        })
        // updating state to dragged file's id
        dispatch(updateDraggingFileId(file.id))
    }

    const stopDraggingHandler = () => {
        const newPos: IPosition = {
            x: 0,
            y: 0
        }

        // updating next card order by +1
        setIsFileDragged(true)
        // clearing position
        setPosition(newPos)
        // reordering files
        fileApi.reorderFile(draggingFileToMoveOrder - 1)
        // hidding order card
        if (orderCardRef.current) {
            orderCardRef.current.style.setProperty('--fileOrder', '')
        }
        // clearing data
        dispatch(updateDraggingFileId(null))
        dispatch(updateDraggingFileToMoveOrder(-1))
    }

    const onDrag: DraggableEventHandler = (e, data) => {
        setPosition({
            x: data.x,
            y: data.y
        })
    }

    const onDragOver = () => {
        // if ref is broken or no dragged file or dragged file's id equals this file's id
        if (!orderCardRef.current || draggingFileId === null || draggingFileId === file.id) return

        // updating where to move order
        dispatch(updateDraggingFileToMoveOrder(file.order))
        // showing order card
        orderCardRef.current.style.setProperty('--fileOrder', `${file.order}`)
    }

    React.useEffect(() => {
        setIsFileDragged(false)
    }, [files])

    return (
        <>
        <Draggable
            bounds='parent'
            axis='both'
            onStart={startDraggingHandler}
            onStop={stopDraggingHandler}
            onDrag={onDrag}
            position={position}
        >
            <li
                style={{'--fileOrder': fileApi.order } as React.CSSProperties}
                ref={ref}
                onMouseOver={onDragOver}
                className={`file-card${isFileDragged ? ' dragged' : ''}`}
                onContextMenu={rClickHandler}
            >
                <FileBgByType className='file-card__bg' file={fileApi.file ?? file} />
                <div className="file-card__info">
                    { fileApi.file?.isDeleted ?
                        <h5 className="info__share-status">Deleted</h5>
                    : fileApi.file?.shareLink &&
                        <h5 className="info__share-status">Shared</h5>
                    }
                    <h3 className="info__name">{fileApi.file?.name}</h3>
                    <h4 className="info__size">{fileApi.file?.size}</h4>
                </div>
            </li>
        </Draggable>
        </>
    )
}