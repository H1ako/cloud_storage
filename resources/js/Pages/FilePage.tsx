// global
import React from 'react'
// layout
import PageLayout from '../Layouts/PageLayout';
// components
import FileBgByType from '../Components/FileBgByType';
// store
import { useAppDispatch } from '../store/hooks';


interface Props {
    user: RequestUserType,
    file: IFile
}

export default function FilePage({user, file}: Props) {
    const dispatch = useAppDispatch()

    return (
        <PageLayout user={user}>
            <FileBgByType file={file} className='file-container' />
        </PageLayout>
    )
}