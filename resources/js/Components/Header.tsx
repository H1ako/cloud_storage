// global
import React from 'react'
import { Link, useRemember } from '@inertiajs/inertia-react'
// components
import Logo from './Logo';
import Search from './Search';
import Profile from './Profile';
import MoreSpaceBtn from './MoreSpaceBtn';
import NavLinks from './NavLinks';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    const [ isNavVisible, setIsNavVisible ] = useRemember(true)
    

    return (
        <header className={`main-header${isNavVisible ? '' : ' nav-hidden'}`}>
            <div className="main-part">
                <Link className='app-logo-link' href="/" preserveState>
                    <Logo />
                </Link>
                <Search />
                <MoreSpaceBtn className="more-space-btn">
                    More Space
                </MoreSpaceBtn>
                <Profile />
                <button onClick={() => setIsNavVisible(state => !state)} className="main-part__btn-toggle">
                    {isNavVisible ?
                        <FontAwesomeIcon icon={faAngleUp} />
                    :
                        <FontAwesomeIcon icon={faAngleDown} />
                    }
                </button>
            </div>
            <NavLinks className='main-nav' />
        </header>
    )
}