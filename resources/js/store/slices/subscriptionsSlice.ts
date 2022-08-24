// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SubscriptionsState {
    subscriptions: ISubscription[],
    isSubscriptionsWindowOpened: boolean
}

const initialState: SubscriptionsState = {
    subscriptions: [],
    isSubscriptionsWindowOpened: false
}


const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        openSubscriptionsWindow: (state: SubscriptionsState) => {
            state.isSubscriptionsWindowOpened = true
        },
        closeSubscriptionsWindow: (state: SubscriptionsState) => {
            state.isSubscriptionsWindowOpened = false
        },
        updateSubscriptions: (state: SubscriptionsState, action: PayloadAction<ISubscription[]>) => {
            state.subscriptions = action.payload
        },
    }
})


export const {
    closeSubscriptionsWindow,
    openSubscriptionsWindow,
    updateSubscriptions
} = subscriptionsSlice.actions

export default subscriptionsSlice.reducer