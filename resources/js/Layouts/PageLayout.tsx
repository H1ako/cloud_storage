// global
import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
// components
import Header from '../Components/Header';
import Asidebar from '../Components/Asidebar';
// store
import { updateUser } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// windows components
import UploadFilesWindow from '../Components/UploadFilesWindow';
import { Page, PageProps } from '@inertiajs/inertia';
import SubscriptionsWindow from '../Components/SubscriptionsWindow';
import { updateSubscriptions } from '../store/slices/subscriptionsSlice';

interface Props {
    children: React.ReactNode,
    user: RequestUserType
}

interface SharedProps extends PageProps, ISharedProps {
    auth: {
        user: RequestUserType,
        mostCheckedFiles: IFile[]
    }
}

export default function PageLayout({ children }: Props) {
    const { auth, globalData }: SharedProps = usePage<Page<SharedProps>>().props
    const dispatch = useAppDispatch()
    const globalState = useAppSelector(state => state)
    const { isUploadWindowOpened } = globalState.files
    const { isSubscriptionsWindowOpened } = globalState.subscriptions

    React.useEffect(() => {
        if (auth.user) {
            dispatch(updateUser(auth.user))
            dispatch(updateSubscriptions(globalData.subscriptions))
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
            { isSubscriptionsWindowOpened &&
                <SubscriptionsWindow />
            }
        </div>
    )
}