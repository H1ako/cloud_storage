// global
import { configureStore } from '@reduxjs/toolkit'
// reducers
import userReducer from './slices/userSlice';
import filesReducer from './slices/filesSlice';
import rClickWindowsReducer from './slices/rClickWindowsSlice'
import subscriptionsReducer from './slices/subscriptionsSlice'
import globalReducer from './slices/globalSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        files: filesReducer,
        windows: rClickWindowsReducer,
        subscriptions: subscriptionsReducer,
        global: globalReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>