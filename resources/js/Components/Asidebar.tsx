// global
import React from 'react'
// components
import CreateBtn from './CreateBtn'
import UploadBtn from './UploadBtn'
import SpaceLeftBlock from './SpaceLeftBlock';
import NavLinks from './NavLinks';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default React.memo(function Asidebar() {
    const [ isVisible, setIsVisible ] = React.useState<boolean>(false)

    const visibleHandler = () => {
        const body = document.querySelector('body')

        if (isVisible) body?.classList.remove('no-scroll')
        else body?.classList.add('no-scroll')

        setIsVisible(!isVisible)
    }

    return (
        <>
        <button className="burger-btn" onClick={visibleHandler}>
            <FontAwesomeIcon icon={faBars} />
        </button>
        <aside className={isVisible ? 'visible' : ''}>
            <UploadBtn />
            <CreateBtn />
            <NavLinks />
            <SpaceLeftBlock />
        </aside>
        </>
    )
})