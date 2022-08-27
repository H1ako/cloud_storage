// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import MoreSpaceBtn from './MoreSpaceBtn';
import PercentageBar from './PercentageBar';


export default function SpaceLeftBlock() {
    const { user } = useAppSelector(state => state.user)

    return (
        <div className="space-left">
            <h4 className="space-left__size">{user?.spaceData.displayUsedSpace}/{user?.spaceData.displayMaxSpace}</h4>
            <PercentageBar value={user?.spaceData.usedSpace ?? 0} maxValue={user?.spaceData.maxSpace ?? 0} />
            <MoreSpaceBtn className='space-left__more-space'>
                Get More Space
            </MoreSpaceBtn>
        </div>
    )
}