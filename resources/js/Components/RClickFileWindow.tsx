// global
import React from 'react'
import RClickWindowLayout from '../Layouts/RClickWindowLayout';

interface Props {
    file: IFile
}

export default function RClickFileWindow({ file }: Props) {
    const [ isRenameWindowOpened, setIsRenameWindowOpened ] = React.useState<boolean>(false)
    const [ isDeleteConfirmWindowOpened, setIsDeleteConfirmWindowOpened ] = React.useState<boolean>(false)

    return (
        <RClickWindowLayout posX={0} posY={0}>
            <a target={'_blank'} href={file.path}>Open</a>
            <button>Rename</button>
            <button>Share</button>
            <button>Delete</button>
            <button>Download</button>
        </RClickWindowLayout>
    )
}