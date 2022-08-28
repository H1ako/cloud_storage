// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react'
// components
import Logo from './Logo';
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