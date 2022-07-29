// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface IUserState {
    user: RequestUserType,
    status: RequestStatusType,
    error: string | null,
    spaceData: IUserSpaceData
}

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null,
    spaceData: {
        maxSpace: 0,
        usedSpace: 0
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state: IUserState, action: PayloadAction<RequestUserType>) => {
            state.user = action.payload
        },
        updateSpaceData: (state: IUserState, action: PayloadAction<IUserSpaceData>) => {
            state.spaceData = action.payload
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateUser, updateSpaceData } = userSlice.actions

export default userSlice.reducer