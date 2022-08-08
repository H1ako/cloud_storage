// global
import React from 'react'
import { InertiaAppOptionsForSSR, usePage } from '@inertiajs/inertia-react'
// components
import Header from '../Components/Header';
import Asidebar from '../Components/Asidebar';
// store
import { updateSpaceData, updateUser } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// windows components
import UploadFilesWindow from '../Components/UploadFilesWindow';
import { Page, PageProps } from '@inertiajs/inertia';

interface Props {
    children: React.ReactNode,
    user: RequestUserType
}

interface SharedProps extends PageProps {
    auth: {
        user: RequestUserType
    }
}

export default function PageLayout({ children }: Props) {
    const { auth }: SharedProps = usePage<Page<SharedProps>>().props
    const dispatch = useAppDispatch()
    const { isUploadWindowOpened } = useAppSelector(state => state.files)

    React.useEffect(() => {
        if (auth.user) {
            dispatch(updateUser(auth.user))
            dispatch(updateSpaceData(auth.user.spaceData))
        }
    }, [auth.user])

    return (
        <div className="page">
            <Header />
            <Asidebar />
            <main>
                <>{children}</>
            </main>
            {/* Windows */}
            { isUploadWindowOpened &&
                <UploadFilesWindow />
            }
        </div>
    )
}