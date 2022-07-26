// global
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// libs
import { getUserFiles } from '../../libs/dataGetters'


interface IFilesState {
    files: IFile[] | [],
    fileToUpload: IFileToUpload | null
    status: RequestStatusType,
    error: string | null
}

const initialState: IFilesState = {
    files: [],
    fileToUpload: null,
    status: 'idle',
    error: null
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        fetchFiles: (state: IFilesState) => {
            getUserFiles()
            .then((data: IUserFilesRequest) => {
                state.files = data.files ?? []
            })
        },
        updateFiles: (state: IFilesState, action: PayloadAction<IFile[]>) => {
            state.files = action.payload ?? []
        },
        updateFileToUpload: (state: IFilesState, action: PayloadAction<IFileToUpload>) => {
            state.fileToUpload = action.payload ?? null
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { fetchFiles, updateFiles } = filesSlice.actions

export default filesSlice.reducer