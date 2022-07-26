// global
import React from 'react'
// components
import CreateBtn from './CreateBtn'
import UploadBtn from './UploadBtn'
import SpaceLeftBlock from './SpaceLeftBlock';


export default function Asidebar() {
    return (
        <aside>
            <UploadBtn />
            <CreateBtn />
            <SpaceLeftBlock />
        </aside>
    )
}