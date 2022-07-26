// global
import { configureStore } from '@reduxjs/toolkit'
// reducers
import { userReducer } from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: process.env.APP_ENV !== 'local'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>