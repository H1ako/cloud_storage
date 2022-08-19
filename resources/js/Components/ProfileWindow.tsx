// global
import React from 'react'
// layouts
import WindowLayout from '../Layouts/WindowLayout';
// components
import CloseBtn from './CloseBtn';
import { TopTextInput } from './TopTextInput';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
// store
import { useAppSelector } from '../store/hooks';


interface Props {
    closeWindow: () => void
}

type ProfilePages = 'main' | 'settings'

export const ProfileWindow = ({ closeWindow }: Props) => {
    const { user } = useAppSelector(state => state.user)
    const [ profilePage, setProfilePage ] = React.useState<ProfilePages>('main')
    const [ userEmail, setUserEmail ] = React.useState<string>('')
    const [ newPassword, setNewPassowrd ] = React.useState<string>('')
    const [ newPasswordAgain, setNewPasswordAgain ] = React.useState<string>('')


    React.useEffect(() => {
        if (!user?.id) return

        setUserEmail(user.email)
    }, [user])


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
                    <div className="profile-window__content content-settings">
                        <img src={user?.picture ?? ''} alt="" className="content__picture" />
                        <TopTextInput
                            className='content__input'
                            state={userEmail}
                            setState={setUserEmail}
                            placeholder='Email'
                            topText='Change email to'
                        />
                        <div className="content__passwords">
                            <TopTextInput
                                className='passwords__input'
                                state={newPassword}
                                setState={setNewPassowrd}
                                placeholder='New Password'
                                topText='Change password to'
                            />
                            <TopTextInput
                                className='passwords__input'
                                state={newPasswordAgain}
                                setState={setNewPasswordAgain}
                                placeholder='New Password Again'
                                topText='Password Again'
                            />
                        </div>
                    </div>
                }
            </div>
        </WindowLayout>
    )
}