// global
import React from 'react'
// libs
import getFileToDipslayLink from '../libs/getFileToDipslayLink';


interface Props {
    pictureUrl?: string,
    setCurrentPictureFile: (picture: File) => void,
    className?: string,
}

export default function UploadPicture ({ setCurrentPictureFile, className='', pictureUrl='' }: Props) {
    const [ currentPictureUrl, setCurrentPictureUrl ] = React.useState<string>('')

    const changePictureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const file = e.target.files[0]
        const fileDisplayUrl = getFileToDipslayLink(file)

        setCurrentPictureUrl(fileDisplayUrl)
        setCurrentPictureFile(file)
    }

    React.useEffect(() => {
        if (!pictureUrl) return

        setCurrentPictureUrl(pictureUrl)
    }, [pictureUrl])

    return (
        <div className={`upload-picture${` ${className}`}`}>
            <label htmlFor="upload-picture-input" className='upload-picture__label'>
                <img src={currentPictureUrl} />
            </label>
            <input
                className="upload-picture__input"
                type='file'
                id='upload-picture-input'
                onChange={changePictureHandler}
            />
        </div>
    )
}