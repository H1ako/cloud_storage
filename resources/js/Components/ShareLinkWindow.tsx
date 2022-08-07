// global
import React from 'react'
// layouts
import { ConfirmWindowLayout } from '../Layouts/ConfirmWindowLayout';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


interface Props {
    fileApi: IFileApi,
    closeWindow: () => void
}

export const ShareLinkWindow =({ fileApi, closeWindow }: Props) => {
    const confirmHandler = () => {
        fileApi.shareFile()
        closeWindow()
    }

    const cancelHandler = () => {
        fileApi.updateFile()
        closeWindow()
    }


    return (
        <ConfirmWindowLayout
            confirm={confirmHandler}
            confirmButtonText={fileApi.shareLink ? 'Share' : fileApi.file?.shareLink ? 'Stop Sharing' : 'Share'}
            cancel={cancelHandler}
        >
            <div className="flex">
                <label htmlFor="share-link-input">{window.location.origin}/files/</label>
                <input value={fileApi.shareLink} id='share-link-input' placeholder='Share Link' className='confirm-window__input text-start' type="text" onChange={e => fileApi.updateShareLink(e.target.value)} />
                <button className="confirm-window__btn copy-link" onClick={fileApi.copyShareLink}>
                    <FontAwesomeIcon icon={faLink} />
                    Copy
                </button>
            </div>
        </ConfirmWindowLayout>
    )
}