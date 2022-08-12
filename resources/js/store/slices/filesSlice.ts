// global
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// libs

type DraggingFileIdType = IdType | null

interface FilesState {
    files: IFile[],
    filesToUpload: File[]
    status: RequestStatusType,
    error: string | null,
    isUploadWindowOpened: boolean,
    draggingFileId: DraggingFileIdType,
    draggingFileToMoveOrder: number,
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
    isUploadWindowOpened: false,
    draggingFileId: null,
    draggingFileToMoveOrder: 0
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
        },
        removeFileToUpload: (state: FilesState, action: PayloadAction<number>) => {
            state.filesToUpload = state.filesToUpload.filter((file: File, index: number) => index !== action.payload)
        },
        updateDraggingFileId: (state: FilesState, action: PayloadAction<DraggingFileIdType>) => {
            state.draggingFileId = action.payload
        },
        updateDraggingFileToMoveOrder: (state: FilesState, action: PayloadAction<number>) => {
            state.draggingFileToMoveOrder = action.payload
        },
    }
})

export const {
    updateFiles,
    updateFilesToUpload,
    addFilesToUpload,
    closeFilesToUploadWindow,
    changeNameFileToUpload,
    removeFileToUpload,
    updateDraggingFileId,
    updateDraggingFileToMoveOrder,
} = filesSlice.actions

export default filesSlice.reducer