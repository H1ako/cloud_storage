// global
import { configureStore } from '@reduxjs/toolkit'
// reducers
import userReducer from './slices/userSlice';
import filesReducer from './slices/FilesSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        files: filesReducer
    },
    devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>