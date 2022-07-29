// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface IWindowsState {
    
}

const initialState: IFilesState = {
    files: [],
    filesToUpload: [],
    status: 'idle',
    error: null,
    isUploadWindowOpened: false
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        updateFiles: (state: IFilesState, action: PayloadAction<RequestFilesType>) => {
            state.files = action.payload ?? []
        },
        updateFilesToUpload: (state: IFilesState, action: PayloadAction<FileListType>) => {
            console.log(action.payload)
            state.filesToUpload = action.payload ?? []

            if (state.filesToUpload.length > 0) {
                state.isUploadWindowOpened = true
            }
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateFiles, updateFilesToUpload } = filesSlice.actions

export default filesSlice.reducer