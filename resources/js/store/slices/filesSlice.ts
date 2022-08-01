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

interface ChangeNameAction {
    fileId: ListFileId,
    name: string
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
        },
        changeNameFileToUpload: (state: FilesState, action: PayloadAction<ChangeNameAction>) => {
            const fileId = action.payload.fileId
            const name = action.payload.name

            if (fileId === null || !name) return

            const oldFile = state.filesToUpload[fileId]

            state.filesToUpload[fileId] = new File([oldFile], name, {
                type: oldFile.type
            })
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { updateFiles, updateFilesToUpload, addFilesToUpload, closeFilesToUploadWindow, changeNameFileToUpload } = filesSlice.actions

export default filesSlice.reducer