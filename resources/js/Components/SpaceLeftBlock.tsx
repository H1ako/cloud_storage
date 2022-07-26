// global
import React from 'react'
// libs
import { getUserSpaceData } from '../libs/dataGetters';
// store
import { useAppSelector } from '../store/hooks';
// components
import MoreSpace from '../Layouts/MoreSpace';


export default function SpaceLeftBlock() {
    const [spaceData, setSpaceData] = React.useState<IUserSpaceRequest>({
        status: 'idle',
        usedSpace: 65,
        maxSpace: 100,
    })
    const { user } = useAppSelector(state => state.user)

    React.useEffect(() => {
        getUserSpaceData()
        .then((data: IUserSpaceRequest) => setSpaceData(data))
    }, [user?.id])

    return (
        <div className="space-left">
            <h4 className="space-left__size">{spaceData.usedSpace}/{spaceData.maxSpace}</h4>
            <div className="space-left__bar" style={{'--usedSpacePercent': Math.round(spaceData.usedSpace / spaceData.maxSpace * 100)} as React.CSSProperties}></div>
            <MoreSpace>
                <button className='space-left__more-space'>Get More Space</button>
            </MoreSpace>
        </div>
    )
}