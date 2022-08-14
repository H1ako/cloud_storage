// global
import React from 'react'
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeFileWindow } from '../store/slices/rClickWindowsSlice';
// components
import FileCard from './FileCard';
import { RClickFileWindow } from './RClickFileWindow';
// layouts
import { ClickOutsideLayout } from '../Layouts/ClickOutsideLayout';
import { updateIsFileDragged } from '../store/slices/filesSlice';


export default function FilesList() {
    const dispatch = useAppDispatch()
    const { files, isFileDragged } = useAppSelector(state => state.files)
    const { isFileWindowOpened } = useAppSelector(state => state.windows)
    const fileWindowRef = React.createRef<HTMLDivElement>()
    const orderCardRef = React.createRef<HTMLDivElement>()

    const clickOutsideHandler = () => {
        dispatch(closeFileWindow())
    }

    const onDragOut = () => {
        if (!orderCardRef.current) return

        // hidding order card
        orderCardRef.current.style.setProperty('--fileOrder', '')
    }

    React.useEffect(() => {
        if (!isFileDragged) return
        
        dispatch(updateIsFileDragged(false))
    }, [files])

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
                <FileCard key={`file-${id}`} orderCardRef={orderCardRef} fileIndex={id} file={file} />
            ))}
        </ul>
    )
}