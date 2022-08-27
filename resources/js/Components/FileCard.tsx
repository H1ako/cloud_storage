// global
import React from 'react'
// components
import FileBgByType from './FileBgByType';
// store
import { useAppDispatch } from '../store/hooks';
import { openFileWindow } from '../store/slices/rClickWindowsSlice';


interface Props {
    file: IFile,
    fileIndex: number,
    onMouseOver?: (e: React.MouseEvent) => void,
    className?: string,
    style?: React.CSSProperties,
    onMouseDown?: () => void
}

const FileCard = React.forwardRef<HTMLLIElement, Props>(({ file, fileIndex, className='', style={}, onMouseDown, onMouseOver=undefined }, ref) => {
    const dispatch = useAppDispatch()


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


    return (
        <li
            style={style}
            ref={ref}
            className={`file-card${' ' + className}`}
            onContextMenu={rClickHandler}
            onMouseOver={onMouseOver}
            onMouseDown={onMouseDown}
        >
            <FileBgByType className='file-card__bg' file={file} />
            <div className="file-card__info">
                { file.isDeleted ?
                    <h5 className="info__share-status">Deleted</h5>
                : file.shareLink &&
                    <h5 className="info__share-status">Shared</h5>
                }
                <h3 className="info__name">{file.name}</h3>
                <h4 className="info__size">{file.displaySize}</h4>
            </div>
        </li>
    )
})

export default FileCard