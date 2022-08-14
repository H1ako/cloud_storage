// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';


export default function Profile() {
    const { user } = useAppSelector(state => state.user)
    
    return (
        <div className='profile'>
            <div className="profile__top">
                <img src={user?.picture ?? ''} alt="" className="top__picture" />
            </div>
        </div>
    )
}