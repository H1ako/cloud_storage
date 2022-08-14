// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faClockRotateLeft, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';
// global
import React from 'react'
import { Link, useRemember } from '@inertiajs/inertia-react'
// components
import Logo from './Logo';
import Search from './Search';
import Profile from './Profile';
import MoreSpaceLayout from '../Layouts/MoreSpaceLayout';


export default function Header() {
    const [ isNavVisible, setIsNavVisible ] = useRemember(true)
    

    return (
        <header className={isNavVisible ? '' : 'nav-hidden'}>
            <div className="main-part">
                <Link className='app-logo-link' href="/" preserveState>
                    <Logo />
                </Link>
                <Search />
                <MoreSpaceLayout>
                    <button className="more-space-btn">
                        More Space
                    </button>
                </MoreSpaceLayout>
                <Profile />
                <button onClick={() => setIsNavVisible(state => !state)} className="main-part__btn-toggle">
                    {isNavVisible ?
                        <FontAwesomeIcon icon={faAngleUp} />
                    :
                        <FontAwesomeIcon icon={faAngleDown} />
                    }
                </button>
            </div>
            <nav>
                <ul className='links'>
                    <li>
                        <Link href='/shared' preserveState>
                            <FontAwesomeIcon icon={faShareNodes} />
                            Shared
                        </Link>
                    </li>
                    <li>
                        <Link href='/trash' preserveState>
                            <FontAwesomeIcon icon={faTrash} />
                            Trash
                        </Link>
                    </li>
                    <li>
                        <Link href='/last' preserveState>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            Last Checked
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}