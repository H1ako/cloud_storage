// global
import React from 'react'
// layouts
import RClickWindowLayout from '../Layouts/RClickWindowLayout';
import WindowLayout from '../Layouts/WindowLayout';
// libs
import getFileToDipslayLink from '../libs/getFileToDipslayLink';
import { useAppSelector } from '../store/hooks';


export default function RClickFileToUploadWindow() {
    const { filesToUpload } = useAppSelector(state => state.files)
    const { clickedFileToUploadData, fileToUploadWindowPosition } = useAppSelector(state => state.windows)
    const [ toDisplayLink, setToDisplayLink ] = React.useState<string>('')
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ fileName, setFileName ] = React.useState<string>('')
    
    React.useEffect(() => {
        if (clickedFileToUploadData.file) {
            setFileName(clickedFileToUploadData.file.name)
        }
        
    }, [clickedFileToUploadData.file && clickedFileToUploadData.file.name])

    React.useEffect(() => {
        if (clickedFileToUploadData.file) {
            const newLink = getFileToDipslayLink(clickedFileToUploadData.file)

            setToDisplayLink(newLink)
        }
    }, [clickedFileToUploadData.file])

    const changeNameHandler = () => {

    }

    return (
        <RClickWindowLayout posX={fileToUploadWindowPosition.posX} posY={fileToUploadWindowPosition.posY}>
            { isRenameWindowOpened &&
                <WindowLayout>
                    <div className="rename-window">
                        <input value={fileName} placeholder='File Name' className='rename-window__input' type="text" onChange={e => setFileName(e.target.value)} />
                        <div className="rename-window__btns">
                            <button className="btns__btn change-btn" onClick={changeNameHandler}>Change</button>
                            <button className="btns__btn cancel-btn" onClick={() => setIsRenameWindowOpened(false)}>Cancel</button>
                        </div>
                    </div>
                </WindowLayout>
            }
            <ul className="btns">
                <li>
                    <a target={'_blank'} href={toDisplayLink}>Open</a>
                </li>
                <li>
                    <button onClick={() => setIsRenameWindowOpened(true)}>Rename</button>
                </li>
                <li>
                    <button>Delete</button>
                </li>
            </ul>
        </RClickWindowLayout>
    )
}