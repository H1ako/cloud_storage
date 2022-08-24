// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface ClickedFileToUploadData {
    file: File | null,
    fileIndex: ListFileId
}

interface ClickedFileData {
    file: IFile | null,
    fileIndex: ListFileId
}

interface ActionOpenFileToUpload {
    position: IPosition,
    fileData: ClickedFileToUploadData
}

interface ActionOpenFile {
    position: IPosition,
    fileData: ClickedFileData 
}

interface WindowsState {
    isFileWindowOpened: boolean,
    isFileToUploadWindowOpened: boolean,
    fileToUploadWindowPosition: IPosition,
    clickedFileToUploadData: ClickedFileToUploadData,
    clickedFileData: ClickedFileData,
    fileWindowPosition: IPosition,
}

const initialState: WindowsState = {
    // user's file
    isFileWindowOpened: false,
    clickedFileData: {
        file: null,
        fileIndex: -1
    },
    fileWindowPosition: {
        x: 0,
        y: 0
    },
    // file to upload
    isFileToUploadWindowOpened: false,
    clickedFileToUploadData: {
        file: null,
        fileIndex: -1
    },
    fileToUploadWindowPosition: {
        x: 0,
        y: 0
    },
}

const rClickWindowsSlice = createSlice({
    name: 'rClickWindows',
    initialState,
    reducers: {
        openFileToUploadWindow: (state: WindowsState, action: PayloadAction<ActionOpenFileToUpload>) => {
            state.fileToUploadWindowPosition = action.payload.position
            state.clickedFileToUploadData = action.payload.fileData

            state.isFileToUploadWindowOpened = true
        },
        closeFileToUploadWindow: (state: WindowsState) => {
            state.isFileToUploadWindowOpened = false
        },
        openFileWindow: (state: WindowsState, action: PayloadAction<ActionOpenFile>) => {
            state.fileWindowPosition = action.payload.position
            state.clickedFileData = action.payload.fileData

            state.isFileWindowOpened = true
        },
        closeFileWindow: (state: WindowsState) => {
            state.isFileWindowOpened = false
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { openFileToUploadWindow, closeFileToUploadWindow, openFileWindow, closeFileWindow } = rClickWindowsSlice.actions

export default rClickWindowsSlice.reducer