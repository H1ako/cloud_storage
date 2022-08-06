// global
import React from 'react'
// layouts
import { ConfirmWindowLayout } from '../Layouts/ConfirmWindowLayout';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


interface Props {
    fileApi: IUseFileApiReturned,
    closeWindow: () => void
}

export const ShareLinkWindow =({ fileApi, closeWindow }: Props) => {
    const confirmHandler = () => {
        fileApi.copyShareLink()
        closeWindow()
    }


    return (
        <ConfirmWindowLayout
            confirm={fileApi.shareFile}
            confirmButtonText={fileApi.shareLink ? 'Share' : 'Stop Sharing'}
            cancel={closeWindow}
        >
            <div className="flex">
                <label htmlFor="share-link-input">{window.location.origin}/files/</label>
                <input value={fileApi.shareLink} id='share-link-input' placeholder='Share Link' className='confirm-window__input text-start' type="text" onChange={e => fileApi.updateShareLink(e.target.value)} />
                <button className="confirm-window__btn copy-link" onClick={confirmHandler}>
                    <FontAwesomeIcon icon={faLink} />
                    Copy
                </button>
            </div>
        </ConfirmWindowLayout>
    )
}