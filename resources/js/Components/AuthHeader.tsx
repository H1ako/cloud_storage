// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faClockRotateLeft, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';
// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react'
// components
import Logo from './Logo';
import Search from './Search';
import Profile from './Profile';
import MoreSpaceBtn from './MoreSpaceBtn';


export default function AuthHeader() {
    return (
        <header className='auth-header'>
            <Link className='app-logo-link' href="/" preserveState>
                <Logo />
            </Link>
        </header>
    )
}