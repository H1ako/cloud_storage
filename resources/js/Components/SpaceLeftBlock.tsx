// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import MoreSpaceBtn from './MoreSpaceBtn';
import PercentageBar from './PercentageBar';


export default function SpaceLeftBlock() {
    const { spaceData } = useAppSelector(state => state.user)

    return (
        <div className="space-left">
            <h4 className="space-left__size">{spaceData.usedSpace}/{spaceData.maxSpace}</h4>
            <PercentageBar value={spaceData.usedSpace} maxValue={spaceData.maxSpace} />
            <MoreSpaceBtn className='space-left__more-space'>
                Get More Space
            </MoreSpaceBtn>
        </div>
    )
}