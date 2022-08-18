// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import { ProfileWindow } from './ProfileWindow';


export default function Profile() {
    const { user } = useAppSelector(state => state.user)
    const [ isProfileOpened, setIsProfileOpened ] = React.useState<boolean>(false)
    
    return (
        <div className='profile'>
            <div className="profile__top">
                <img src={user?.picture ?? ''} alt="" className="top__picture" onClick={() => setIsProfileOpened(true)} />
            </div>
            { isProfileOpened &&
                <ProfileWindow closeWindow={() => setIsProfileOpened(false)} />
            }
        </div>
    )
}