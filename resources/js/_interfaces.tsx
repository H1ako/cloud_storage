// users
interface IUser {
    id: IdType,
    email: string,
    picture?: string | null,
    subscription: ISubscription | IdType,
    files?: null | File[]
}

interface ISubscription {
    id: IdType,
    name: string,
    maxSpace: SpaceSizeType,
    price: number,
    currency: string
}


// files
interface IFile {
    id: IdType,
    file: string,
    name: string,
    size: SpaceSizeType,
    type: FileType,
    shareLink: string
    user?: IdType | IUser
}

interface IFileToUpload {
    file: string | File,
    name: string,
    shareLink?: string
}

// requests
interface IRequest {
    status: 'success' | 'error' | 'idle',
}

interface IUserRequest extends IRequest {
    user: IUser
}

interface IUserSpaceRequest extends IRequest {
    maxSpace: SpaceSizeType,
    usedSpace: SpaceSizeType
}

interface IUserFilesRequest extends IRequest {
    files: IFile[] | [],
}

