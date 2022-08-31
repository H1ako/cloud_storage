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
import { faAngleDown, faAngleUp, faBars } from '@fortawesome/free-solid-svg-icons';
// store
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAsideBarVisibility } from '../store/slices/globalSlice';


export default function Header() {
    const dispatch = useAppDispatch()
    const { isAsideBarOpened } = useAppSelector(state => state.global)
    const [ isNavVisible, setIsNavVisible ] = useRemember(true)

    const asideBarVisibilityHandler = () => {
        const body = document.querySelector('body')

        if (isAsideBarOpened) body?.classList.remove('no-scroll')
        else body?.classList.add('no-scroll')

        dispatch(setAsideBarVisibility(!isAsideBarOpened))
    }
    

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
                <button className="asidebar-btn" onClick={asideBarVisibilityHandler}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <NavLinks className='main-nav' />
        </header>
    )
}