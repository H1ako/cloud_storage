// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs


interface IClickedFileToUpload {
    file: File | null,
    fileId: ListFileId
}

interface IClickedFile {
    file: File | null,
    fileId: number | null
}

interface IActionOpenFileToUpload {
    position: IPosition,
    fileData: IClickedFileToUpload
}

interface WindowsState {
    isFileWindowOpened: boolean,
    isFileToUploadWindowOpened: boolean,
    fileToUploadWindowPosition: IPosition,
    clickedFileToUploadData: IClickedFileToUpload,
    clickedFileData: IClickedFile,
}

const initialState: WindowsState = {
    isFileWindowOpened: false,
    isFileToUploadWindowOpened: false,
    fileToUploadWindowPosition: {
        posX: 0,
        posY: 0
    },
    clickedFileToUploadData: {
        file: null,
        fileId: null
    },
    clickedFileData: {
        file: null,
        fileId: null
    }
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
        }
    }
})

// export const getUser = createAsyncThunk('user/getUser', getUserData)

export const { openFileToUploadWindow, closeFileToUploadWindow } = rClickWindowsSlice.actions

export default rClickWindowsSlice.reducer