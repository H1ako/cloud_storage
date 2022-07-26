// global
import React from 'react'
// layout
import PageLayout from '../Layouts/PageLayout';
// components
import FileBgByType from '../Components/FileBgByType';
import { ShareLinkWindow } from '../Components/ShareLinkWindow';
import { RenameWindow } from '../Components/RenameWindow';
import { DeleteConfirmWindow } from '../Components/DeleteConfirmWindow';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
// libs
import useFileApi from '../libs/useFileApi';


interface Props extends ISharedProps {
    file: IFile
}

export default function FilePage({auth, file}: Props) {
    const fileApi = useFileApi(file)
    // windows open state
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ isShareLinkWindowOpened, setIsShareLinkWindowOpened ] = React.useState<boolean>(false)
    const [ isDeleteConfirmWindowOpened, setIsDeleteConfirmWindowOpened ] = React.useState<boolean>(false)

    return (
        <PageLayout user={auth.user}>
            { isShareLinkWindowOpened &&
                <ShareLinkWindow fileApi={fileApi} closeWindow={() => setIsShareLinkWindowOpened(false)} />
            }
            { isRenameWindowOpened &&
                <RenameWindow fileApi={fileApi} closeWindow={() => setIsRenameWindowOpened(false)} />
            }
            { isDeleteConfirmWindowOpened &&
                <DeleteConfirmWindow fileApi={fileApi} closeWindow={() => setIsDeleteConfirmWindowOpened(false)} />
            }
            <div className="file-controll-btns">
                { auth.user?.id === file.user_id &&
                    <>
                    <button className="file-controll-btns__btn" onClick={() => setIsRenameWindowOpened(true)}>Rename</button>
                    <button className="file-controll-btns__btn" onClick={() => setIsDeleteConfirmWindowOpened(true)}>Delete</button>
                    </>
                }
                <a target='_blank' href={file.displayPath} className="file-controll-btns__btn">Full Size</a>
            </div>
            <div className="file-info">
                <FileBgByType file={file} className='file-info__bg' />
                <h1 className="file-info__name">{file.name}</h1>
                <h3 className="file-info__size">{file.displaySize}</h3>
            </div>
            <div className="main-btns">
                <button className="main-btns__btn share-btn" onClick={() => setIsShareLinkWindowOpened(true)}>Share</button>
                <a className='main-btns__btn download-btn' href={file.displayPath} download={file.name}>
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    Download
                </a>
            </div>
        </PageLayout>
    )
}