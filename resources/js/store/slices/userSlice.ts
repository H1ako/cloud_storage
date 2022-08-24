// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface UserState {
    user: RequestUserType,
    status: RequestStatusType,
    error: string | null,
    spaceData: IUserSpaceData
}

const initialState: UserState = {
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
        updateUser: (state: UserState, action: PayloadAction<RequestUserType>) => {
            state.user = action.payload
        },
        updateSpaceData: (state: UserState, action: PayloadAction<IUserSpaceData>) => {
            state.spaceData = action.payload
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateUser, updateSpaceData } = userSlice.actions

export default userSlice.reducer