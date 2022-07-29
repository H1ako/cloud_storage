// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface IFilesState {
    files: IFile[] | [],
    filesToUpload: FileListType
    status: RequestStatusType,
    error: string | null,
    isUploadWindowOpened: boolean
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