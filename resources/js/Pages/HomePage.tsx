// global
import React from 'react'
// layout
import PageLayout from '../Layouts/PageLayout';
// components
import UploadFileBlock from '../Components/UploadFileBlock';
import FilesList from '../Components/FilesList';
import { useAppDispatch } from '../store/hooks';
import { updateFiles } from '../store/slices/filesSlice';

interface Props extends ISharedProps {
    files: RequestFilesType
}

export default function HomePage({auth, files}: Props) {
    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(updateFiles(files))
    }, [files])

    return (
        <PageLayout user={auth.user}>
            <UploadFileBlock />
            <FilesList />
        </PageLayout>
    )
}