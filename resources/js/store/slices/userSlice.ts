// global
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// libs
import { getUserData } from '../../libs/dataGetters'


interface IUserState {
    user: IUser | null,
    status: RequestStatusType,
    error: string | null
}

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser: (state: IUserState) => {
            getUserData()
            .then((data: IUserRequest) => {
                state.user = data.user
            })
        },
        updateUser: (state: IUserState, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { fetchUser, updateUser } = userSlice.actions

export default userSlice.reducer