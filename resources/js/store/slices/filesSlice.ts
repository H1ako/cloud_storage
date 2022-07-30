// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface FilesState {
    files: IFile[],
    filesToUpload: File[]
    status: RequestStatusType,
    error: string | null,
    isUploadWindowOpened: boolean
}

const initialState: FilesState = {
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
        updateFiles: (state: FilesState, action: PayloadAction<RequestFilesType>) => {
            state.files = action.payload ?? []
        },
        updateFilesToUpload: (state: FilesState, action: PayloadAction<FileListType>) => {
            const stateToUpdate = action.payload ? [...action.payload] : []

            state.filesToUpload = stateToUpdate

            if (state.filesToUpload.length > 0) {
                state.isUploadWindowOpened = true
            }
        },
        addFilesToUpload: (state: FilesState, action: PayloadAction<FileListType>) => {
            const stateToUpdate = action.payload ?? []

            state.filesToUpload = [...stateToUpdate, ...state.filesToUpload]
        },
        closeFilesToUploadWindow: (state: FilesState) => {
            state.isUploadWindowOpened = false
            state.filesToUpload = []
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateFiles, updateFilesToUpload, addFilesToUpload, closeFilesToUploadWindow } = filesSlice.actions

export default filesSlice.reducer