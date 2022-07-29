type FileListType = File[]
type FileType = 'video' | 'image' | 'archive' | 'text' | 'other'
type RequestStatusType = 'idle' | 'loading' | 'failed' | 'succeeded'
type SpaceSizeType = number
type IdType = number | string
type RequestUserType = IUser | null
type RequestFilesType = IFile[] | []