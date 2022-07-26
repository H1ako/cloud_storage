// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faClockRotateLeft, faFolder, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';
// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react'
// components
import Logo from './Logo';
import Search from './Search';
import Profile from './Profile';


export default function Header() {
    const [ isNavVisible, setIsNavVisible ] = React.useState(true)

    return (
        <header>
            <div className="main-part">
                <Logo />
                <Search />
                <button className="main-part__more-space">More Space</button>
                <Profile />
                <button onClick={() => setIsNavVisible(state => !state)} className="main-part__btn-toggle">
                    {isNavVisible ?
                        <FontAwesomeIcon icon={faAngleUp} />
                    :
                        <FontAwesomeIcon icon={faAngleDown} />
                    }
                </button>
            </div>
            <nav className={isNavVisible ? '' : 'hidden'}>
                <ul className='links'>
                    <li>
                        <Link href='/files'>
                            <FontAwesomeIcon icon={faFolder} />
                            Files
                        </Link>
                    </li>
                    <li>
                        <Link href='/last'>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            Last Used
                        </Link>
                    </li>
                    <li>
                        <Link href='/trash'>
                            <FontAwesomeIcon icon={faTrash} />
                            Trash
                        </Link>
                    </li>
                    <li>
                        <Link href='/shared'>
                            <FontAwesomeIcon icon={faShareNodes} />
                            Shared
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}