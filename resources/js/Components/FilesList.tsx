// global
import React from 'react'
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// components
import DraggableFileCard from './DraggableFileCard';
import { RClickFileWindow } from './RClickFileWindow';
// layouts
import { ClickOutsideLayout } from '../Layouts/ClickOutsideLayout';


export default function FilesList() {
    const dispatch = useAppDispatch()
    const { files } = useAppSelector(state => state.files)
    const { isFileWindowOpened } = useAppSelector(state => state.windows)
    const fileWindowRef = React.createRef<HTMLDivElement>()
    const orderCardRef = React.useRef<HTMLDivElement>(null)

    const clickOutsideHandler = () => {
        dispatch(closeFileWindow())
    }

    const onDragOut = () => {
        if (!orderCardRef.current) return

        // hidding order card
        orderCardRef.current.style.setProperty('--fileOrder', '')
    }

    return (
        <ul className='files-list'>
            { isFileWindowOpened &&
                <ClickOutsideLayout ref={fileWindowRef} onClick={clickOutsideHandler}>
                    <RClickFileWindow />
                </ClickOutsideLayout>
            }
            <div
                onMouseOut={onDragOut}
                className="order-card"
                ref={orderCardRef}
                style={{ '--fileOrder': undefined } as React.CSSProperties}
            />
            {files.map((file, id) => (
                <DraggableFileCard key={`file-${id}`} orderCardRef={orderCardRef} fileIndex={id} file={file} />
            ))}
        </ul>
    )
}