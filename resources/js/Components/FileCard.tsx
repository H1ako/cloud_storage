// global
import React from 'react'
import Draggable, {DraggableEventHandler} from 'react-draggable';
// components
import FileBgByType from './FileBgByType';
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';
import { updateDraggingFileId, updateDraggingFileToMoveOrder } from '../store/slices/filesSlice';
import useFileApi from '../libs/useFileApi';


interface Props {
    file: IFile,
    fileIndex: number
}

export default function FileCard({ file, fileIndex }: Props) {
    const dispatch = useAppDispatch()
    const { draggingFileId, draggingFileToMoveOrder } = useAppSelector(state => state.files)
    const [ hovering, setHovering ] = React.useState<boolean>(false)
    const [ dragging, setDragging ] = React.useState<boolean>(false)
    const [ position, setPosition ] = React.useState<any>({
        x: 0,
        y: 0
    })
    const fileApi = useFileApi(file)
    const ref = React.createRef<HTMLLIElement>()

    const rClickHandler = (e: React.MouseEvent) => {
        // if pressed button is not right
        e.preventDefault()
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
        setDragging(true)
        setPosition({
            x: ref.current.offsetLeft,
            y: ref.current.offsetTop
        })
        dispatch(updateDraggingFileId(file.id))
    }

    const stopDraggingHandler = () => {
        fileApi.reorderFile(draggingFileToMoveOrder)
        setDragging(false)
        setPosition({
            x: 0,
            y: 0
        })
        dispatch(updateDraggingFileId(null))
    }

    const onDrag: DraggableEventHandler = (e, data) => {
        setPosition({
            x: data.x,
            y: data.y
        })
    }

    const onDragOver = () => {
        if (draggingFileId === null) return

        dispatch(updateDraggingFileToMoveOrder(file.order))
    }

    return (
        <>
        <div onMouseOver={onDragOver} className={`order-card${hovering && !dragging ? '  visible' : ''}${draggingFileId !== null ? ' dragging' : ''}`}/>
        <Draggable
            bounds='parent'
            axis='both'
            onStart={startDraggingHandler}
            onStop={stopDraggingHandler}
            onDrag={onDrag}
            position={position}
        >
            <li ref={ref} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className='file-card' onContextMenu={rClickHandler}>
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