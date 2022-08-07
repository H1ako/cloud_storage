// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface IClickedFileToUploadData {
    file: File | null,
    fileIndex: ListFileId
}

interface IClickedFileData {
    file: IFile | null,
    fileIndex: ListFileId
}

interface IActionOpenFileToUpload {
    position: IPosition,
    fileData: IClickedFileToUploadData
}

interface IActionOpenFile {
    position: IPosition,
    fileData: IClickedFileData 
}

interface WindowsState {
    isFileWindowOpened: boolean,
    isFileToUploadWindowOpened: boolean,
    fileToUploadWindowPosition: IPosition,
    clickedFileToUploadData: IClickedFileToUploadData,
    clickedFileData: IClickedFileData,
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
        posX: 0,
        posY: 0
    },
    // file to upload
    isFileToUploadWindowOpened: false,
    clickedFileToUploadData: {
        file: null,
        fileIndex: -1
    },
    fileToUploadWindowPosition: {
        posX: 0,
        posY: 0
    },
}

const rClickWindowsSlice = createSlice({
    name: 'rClickWindows',
    initialState,
    reducers: {
        openFileToUploadWindow: (state: WindowsState, action: PayloadAction<IActionOpenFileToUpload>) => {
            state.fileToUploadWindowPosition = action.payload.position
            state.clickedFileToUploadData = action.payload.fileData

            state.isFileToUploadWindowOpened = true
        },
        closeFileToUploadWindow: (state: WindowsState) => {
            state.isFileToUploadWindowOpened = false
        },
        openFileWindow: (state: WindowsState, action: PayloadAction<IActionOpenFile>) => {
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