// global
import React from 'react'
// components
import CreateBtn from './CreateBtn'
import UploadBtn from './UploadBtn'
import SpaceLeftBlock from './SpaceLeftBlock';
import NavLinks from './NavLinks';
// store
import { useAppSelector } from '../store/hooks';


export default React.memo(function Asidebar() {
    const { isAsideBarOpened } = useAppSelector(state => state.global)

    return (
        <aside className={isAsideBarOpened ? 'visible' : ''}>
            <UploadBtn />
            <CreateBtn />
            <NavLinks />
            <SpaceLeftBlock />
        </aside>
    )
})