// global
import React from 'react'
// components
import WindowLayout from '../Layouts/WindowLayout';
import SubscriptionCard from './SubscriptionCard';
import CloseBtn from './CloseBtn';
// store
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeSubscriptionsWindow } from '../store/slices/subscriptionsSlice';


export default function SubscriptionsWindow() {
    const dispatch = useAppDispatch()
    const globalState = useAppSelector(state => state)
    const { subscriptions } = globalState.subscriptions
    const { user } = globalState.user

    const closeWindow = (): void => {
        dispatch(closeSubscriptionsWindow())
    }

    return (
        <WindowLayout>
            <CloseBtn onClose={closeWindow} />
            <div className="subscription-window">
                <ul className="subscriptions-list">
                    { subscriptions.map(sub => (
                        <SubscriptionCard
                            usedSpace={user?.spaceData.usedSpace ?? 0}
                            isUsersSubscription={user?.subscription_name === sub.name}
                            subscription={sub}
                            key={`sub-${sub.id}`}
                        />
                    ))}
                </ul>
            </div>
        </WindowLayout>
    )
}