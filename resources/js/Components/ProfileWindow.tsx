// global
import React from 'react'
import { Page, PageProps } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/inertia-react';
// layouts
import WindowLayout from '../Layouts/WindowLayout';
import ClickOutsideLayout from '../Layouts/ClickOutsideLayout';
// components
import CloseBtn from './CloseBtn';
import TopTextInput from './TopTextInput';
import FileCard from './FileCard';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import UploadPicture from './UploadPicture';


interface Props {
    closeWindow: () => void
}

type ProfilePages = 'main' | 'settings'

interface SharedProps extends PageProps {
    auth: {
        user: RequestUserType,
        mostCheckedFiles: IFile[]
    }
}

export const ProfileWindow = ({ closeWindow }: Props) => {
    const { auth }: SharedProps = usePage<Page<SharedProps>>().props
    const [ profilePage, setProfilePage ] = React.useState<ProfilePages>('main')
    const [ userEmail, setUserEmail ] = React.useState<string>('')
    const [ newPassword, setNewPassowrd ] = React.useState<string>('')
    const [ newPasswordAgain, setNewPasswordAgain ] = React.useState<string>('')
    const [ currentPictureFile, setCurrentPictureFile ] = React.useState<File | null>(null)
    const windowRef = React.useRef<HTMLDivElement>(null)


    React.useEffect(() => {
        if (!auth.user?.id) return

        setUserEmail(auth.user.email)
    }, [auth.user])


    return (
        <WindowLayout>
            <CloseBtn onClose={closeWindow}/>
            <ClickOutsideLayout onClick={closeWindow} ref={windowRef}>
                <div ref={windowRef} className="profile-window">
                    <nav aria-label='profile nav' className="profile-window__nav">
                        <ul>
                            <li>
                                <button
                                    className='nav__link'
                                    disabled={profilePage === 'main'}
                                    onClick={() => setProfilePage('main')}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    className='nav__link'
                                    disabled={profilePage === 'settings'}
                                    onClick={() => setProfilePage('settings')}
                                >
                                    <FontAwesomeIcon icon={faGear} />
                                    Settings
                                </button>
                            </li>
                            <li>
                                <Link className='nav__link' href='/sign-out'>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    { profilePage === 'main' &&
                        <div className="profile-window__content content-main">
                            <div className="content__user-info">
                                <img className="user-info__picture" src={auth.user?.picture ?? ''} />
                                <div className="user-info__main">
                                    <h2 className="main__email">{auth.user?.email}</h2>
                                    <div className="main__info-blocks">
                                        <div className="info-blocks__block">
                                            <h5 className="block__name">
                                                Shared Files
                                            </h5>
                                            <h3 className="block__count">
                                                {auth.user?.totalSharedFiles}
                                            </h3>
                                        </div>
                                        <div className="info-blocks__block">
                                            <h5 className="block__name">
                                                Deleted Files
                                            </h5>
                                            <h3 className="block__count">
                                            {auth.user?.totalDeletedFiles}
                                            </h3>
                                        </div>
                                        <div className="info-blocks__block">
                                            <h5 className="block__name">
                                                Files
                                            </h5>
                                            <h3 className="block__count">
                                                {auth.user?.totalFiles}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content__most-popular-files">
                                <h2 className='most-popular-files__heading'>Most Popular Files</h2>
                                    <ul className="most-popular-files__files-list">
                                    { Object.values(auth.mostCheckedFiles).map((file, index) => 
                                        <FileCard key={`profile-file-${index}`} file={file} fileIndex={index} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    }
                    { profilePage === 'settings' &&
                        <div className="profile-window__content content-settings">
                            <UploadPicture
                                pictureUrl={auth.user?.picture ?? ''}
                                setCurrentPictureFile={setCurrentPictureFile}
                                className='content__picture'
                            />
                            <TopTextInput
                                type='email'
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
                            <Link
                                method='post'
                                href='/api/user'
                                as='button'
                                type='button'
                                data={{ 
                                    email: userEmail,
                                    password: newPassword,
                                    passwordAgain: newPasswordAgain,
                                    picture: currentPictureFile,
                                    _method: 'PUT'
                                }}
                                className='content__save-btn'
                                preserveScroll={true}
                            >
                                Save Changes
                            </Link>
                        </div>
                    }
                </div>
            </ClickOutsideLayout>
        </WindowLayout>
    )
}