// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface UserState {
    user: RequestUserType,
    status: RequestStatusType,
    error: string | null,
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state: UserState, action: PayloadAction<RequestUserType>) => {
            state.user = action.payload
        },
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateUser } = userSlice.actions

export default userSlice.reducer