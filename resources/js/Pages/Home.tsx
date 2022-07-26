// global
import React from 'react'
// layout
import PageLayout from '../Layouts/Page';
// components
import UploadFileBlock from '../Components/UploadFileBlock';
import FilesList from '../Components/FilesList';


export default function HomePage() {
    return (
        <PageLayout>
            <UploadFileBlock />
            <FilesList />
        </PageLayout>
    )
}