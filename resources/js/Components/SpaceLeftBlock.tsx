// global
import React from 'react'
// store
import { useAppSelector } from '../store/hooks';
// components
import MoreSpaceLayout from '../Layouts/MoreSpaceLayout';


export default function SpaceLeftBlock() {
    const { spaceData } = useAppSelector(state => state.user)

    return (
        <div className="space-left">
            <h4 className="space-left__size">{spaceData.usedSpace}/{spaceData.maxSpace}</h4>
            <div className="space-left__bar" style={{'--usedSpacePercent': Math.round(spaceData.usedSpace / spaceData.maxSpace * 100)} as React.CSSProperties}></div>
            <MoreSpaceLayout>
                <button className='space-left__more-space'>Get More Space</button>
            </MoreSpaceLayout>
        </div>
    )
}