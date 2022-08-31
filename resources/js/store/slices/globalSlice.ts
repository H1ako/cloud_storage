// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface GlobalState {
    isAsideBarOpened: boolean
}

const initialState: GlobalState = {
    isAsideBarOpened: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAsideBarVisibility: (state: GlobalState, action: PayloadAction<boolean>) => {
            state.isAsideBarOpened = action.payload
        }
    }
})


export const { setAsideBarVisibility } = globalSlice.actions

export default globalSlice.reducer