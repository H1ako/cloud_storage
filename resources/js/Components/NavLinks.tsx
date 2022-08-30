// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faShareNodes, faTrash, faFile } from '@fortawesome/free-solid-svg-icons';


interface Props {
    className?: string
}

export default function NavLinks({ className }: Props) {
    return (
        <nav className={className ? `nav-links ${className}` : 'nav-links'}>
            <ul className={className ? `nav-links__links ${className}__links` : 'nav-links__links'}>
                <li>
                    <Link href='/' preserveState>
                        <FontAwesomeIcon icon={faFile} />
                        Files
                    </Link>
                </li>
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
    )
}