// global
import React from 'react'
// layouts
import WindowLayout from '../Layouts/WindowLayout';
// components
import CloseBtn from './CloseBtn';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
// store
import { useAppSelector } from '../store/hooks';


interface Props {
    closeWindow: () => void
}

type ProfilePages = 'main' | 'settings'

export const ProfileWindow =({ closeWindow }: Props) => {
    const { user } = useAppSelector(state => state.user)
    const [ profilePage, setProfilePage ] = React.useState<ProfilePages>('main')

    return (
        <WindowLayout>
            <CloseBtn onClose={closeWindow}/>
            <div className="profile-window">
                <nav aria-label='profile nav' className="profile-window__nav">
                    <ul>
                        <li>
                            <button
                                disabled={profilePage === 'main'}
                                onClick={() => setProfilePage('main')}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                disabled={profilePage === 'settings'}
                                onClick={() => setProfilePage('settings')}
                            >
                                <FontAwesomeIcon icon={faGear} />
                                Settings
                            </button>
                        </li>
                    </ul>
                </nav>
                { profilePage === 'main' &&
                    <div className="profile-window__content content-main">
                        <div className="content__user-info">
                            <img className="user-info__picture" />
                            <div className="user-info__main">
                                <h2 className="main__email">{user?.email}</h2>
                                <div className="main__info-blocks">
                                    <div className="info-blocks__block">
                                        Files
                                        30
                                    </div>
                                    <div className="info-blocks__block">
                                        Shared Files
                                        5
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                { profilePage === 'settings' &&
                    <div className="profile-window__content content-settigns">
                        settings
                    </div>
                }
            </div>
        </WindowLayout>
    )
}