// global
import React from 'react'
import Draggable, {DraggableEventHandler} from 'react-draggable';
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDraggingFileId, updateDraggingFileToMoveOrder } from '../store/slices/filesSlice';
// libs
import useFileApi from '../libs/useFileApi';
// components
import FileCard from './FileCard';


interface Props {
    file: IFile,
    fileIndex: number,
    orderCardRef: React.RefObject<HTMLDivElement>
}

export default function DraggableFileCard({ file, fileIndex, orderCardRef }: Props) {
    const dispatch = useAppDispatch()
    const { draggingFileId, draggingFileToMoveOrder } = useAppSelector(state => state.files)
    const [ position, setPosition ] = React.useState<IPosition>({
        x: 0,
        y: 0
    })
    const fileApi = useFileApi(file)
    const ref = React.useRef<HTMLLIElement>(null)

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

        // clearing position
        setPosition(newPos)
        // reordering files
        const fileCardWithCurrentOrder = document.querySelector(`.file-card[style*="--fileOrder: ${draggingFileToMoveOrder}"]`)
        ref.current?.parentNode?.insertBefore(ref.current, fileCardWithCurrentOrder)
        fileApi.reorderFile(draggingFileToMoveOrder)
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


    return (
        <Draggable
            bounds='parent'
            axis='both'
            onStart={startDraggingHandler}
            onStop={stopDraggingHandler}
            onDrag={onDrag}
            position={position}
        >
            <FileCard
                file={file}
                fileIndex={fileIndex}
                style={{'--fileOrder': fileApi.order } as React.CSSProperties}
                ref={ref}
                onMouseOver={onDragOver}
            />
        </Draggable>
    )
}