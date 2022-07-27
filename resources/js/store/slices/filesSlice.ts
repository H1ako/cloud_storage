// global
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// libs
import { getUserFiles } from '../../libs/dataGetters'


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
        fetchFiles: (state: IFilesState) => {
            getUserFiles()
            .then((data: IUserFilesRequest) => {
                state.files = data.files ?? []
            })
        },
        updateFiles: (state: IFilesState, action: PayloadAction<IFile[]>) => {
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

export const { fetchFiles, updateFiles, updateFilesToUpload } = filesSlice.actions

export default filesSlice.reducer