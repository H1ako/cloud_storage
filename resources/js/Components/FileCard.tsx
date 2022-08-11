// global
import React from 'react'
import Draggable, {DraggableEventHandler, DraggableCore} from 'react-draggable';
// components
import FileBgByType from './FileBgByType';
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';
import { updateDraggingFileId } from '../store/slices/filesSlice';


interface Props {
    file: IFile,
    fileIndex: number
}

export default function FileCard({ file, fileIndex }: Props) {
    const dispatch = useAppDispatch()
    const { draggingFileId } = useAppSelector(state => state.files)
    const [ hovering, setHovering ] = React.useState<boolean>(false)
    const [ dragging, setDragging ] = React.useState<boolean>(false)
    const ref = React.createRef<HTMLLIElement>()
    const [ position, setPosition ] = React.useState<any>({
        x: 0,
        y: 0
    })

    const rClickHandler = (e: React.MouseEvent) => {
        // if pressed button is not right
        e.preventDefault()
        if (e.button !== 2) return

        dispatch(openFileWindow({
            position: {
                posX: e.clientX,
                posY: e.clientY
            },
            fileData: {
                file: file,
                fileIndex: fileIndex
            }
        }))
    }

    const startDraggingHandler: DraggableEventHandler = (e, data) => {
        // console.log(e, data)
        if (!ref.current) return
        console.log(ref.current.offsetLeft, ref.current.offsetTop)
        setDragging(true)
        setPosition({
            x: ref.current.offsetLeft,
            y: ref.current.offsetTop
        })
        dispatch(updateDraggingFileId(file.order))
    }

    const stopDraggingHandler = () => {
        setDragging(false)
        setPosition({
            x: 0,
            y: 0
        })
        dispatch(updateDraggingFileId(null))
    }

    const changeOrderhandler = () => {
        console.log(`/files/${draggingFileId}`, {
            order: file.order
        })
        // Inertia.put(`/files/${draggingFileId}`, {
        //     order: file.order + 1
        // })
    }

    const onDrag: DraggableEventHandler = (e, data) => {
        const newY = `${data.y}px`
        const newX = `${data.x}px`
        setPosition({
            x: data.x,
            y: data.y
        })
        // data.node.style.top = newY
        // data.node.style.left = newX
        // console.log(data)
    }

    return (
        <>
        <div className={`order-card${hovering && draggingFileId !== null && !dragging ? '  visible' : ''}`} onMouseUp={changeOrderhandler}/>
        <Draggable
            bounds='parent'
            axis='both'
            onStart={startDraggingHandler}
            onStop={stopDraggingHandler}
            onDrag={onDrag}
            position={position}
        >
            <li ref={ref} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className='file-card' onContextMenu={rClickHandler}>
                <FileBgByType className='file-card__bg' file={file} />
                <div className="file-card__info">
                    { file.isDeleted ?
                        <h5 className="info__share-status">Deleted</h5>
                    : file.shareLink &&
                        <h5 className="info__share-status">Shared</h5>
                    }
                    <h3 className="info__name">{file.name}</h3>
                    <h4 className="info__size">{file.size}</h4>
                </div>
            </li>
        </Draggable>
        </>
    )
}