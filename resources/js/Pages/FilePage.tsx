// global
import React from 'react'
// layout
import PageLayout from '../Layouts/PageLayout';
// components
import FileCardBg from '../Components/FileCardBg';
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
            <FileCardBg file={file} />
        </PageLayout>
    )
}