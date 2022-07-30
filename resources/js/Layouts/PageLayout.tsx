// global
import React from 'react'
// components
import Header from '../Components/Header';
import Asidebar from '../Components/Asidebar';
// store
import { updateSpaceData, updateUser } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import UploadFilesWindow from '../Components/UploadFilesWindow';

interface Props {
    children: React.ReactNode,
    user: RequestUserType
}

export default function PageLayout(props: Props) {
    const { children, user } = props
    const dispatch = useAppDispatch()
    const { isUploadWindowOpened } = useAppSelector(state => state.files)

    React.useEffect(() => {
        if (user?.id) {
            dispatch(updateUser(user))
            dispatch(updateSpaceData(user.spaceData))
        }
    }, [user])

    return (
        <div className="page">
            <Header />
            <Asidebar />
            <main>
                <>{children}</>
            </main>
            {/* Windows */}
            {isUploadWindowOpened &&
                <UploadFilesWindow />
            }
        </div>
    )
}