// global
import React from 'react'
// components
import PercentageBar from './PercentageBar';

interface Props {
    subscription: ISubscription,
    className?: string,
    style?: React.CSSProperties,
    isUsersSubscription: boolean,
    usedSpace: number
}

const SubscriptionCard = ({ subscription, className='', style={}, isUsersSubscription, usedSpace }: Props) => {
    return (
        <li
            style={style}
            className={`subscription-card${' ' + className}`}
        >
            <div className="subscription-card__head">
                <h2 className="head__name">{subscription.name}</h2>
            </div>
            <div className="subscription-card__content">
                <h2 className="content__price">{subscription.price}{subscription.currency}</h2>
                <h4 className="content__max-space">{subscription.maxSpace}</h4>
                <PercentageBar value={usedSpace} maxValue={subscription.maxSpace} />
                { isUsersSubscription ?
                    <button disabled className="content__btn">Active</button>
                :
                    <button className="content__btn">Get</button>
                }
            </div>
        </li>
    )
}

export default SubscriptionCard