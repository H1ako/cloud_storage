// global
interface IPosition {
    posX: number,
    posY: number
}


// users
interface IUser {
    id: IdType,
    email: string,
    picture?: string | null,
    subscription: ISubscription | IdType,
    files?: null | File[],
    spaceData: IUserSpaceData
}

interface ISubscription {
    id: IdType,
    name: string,
    maxSpace: SpaceSizeType,
    price: number,
    currency: string
}

interface IUserSpaceData {
    maxSpace: number,
    usedSpace: number
}


// files
interface IFile {
    id: IdType,
    path: string,
    name: string,
    size: SpaceSizeType,
    type: FileType,
    shareLink: string
    user?: IUser,
    user_id: IdType
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

