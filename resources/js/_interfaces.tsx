// global
interface IPosition {
    x: number,
    y: number
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
    readonly id: IdType,
    readonly path: string,
    readonly displayPath: string,
    name: string,
    readonly size: SpaceSizeType,
    readonly type: FileType,
    shareLink: string,
    isDeleted: 0 | 1,
    readonly user?: IUser,
    readonly user_id: IdType,
    readonly checkedBy: number,
    order: number
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

