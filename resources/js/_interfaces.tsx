// global
interface IPosition {
    x: number,
    y: number
}

interface ISharedProps {
    auth: {
        user: RequestUserType
    },
    globalData: {
        subscriptions:ISubscription[]
    }
    errors: {}
}


// users
interface IUser {
    id: IdType,
    email: string,
    picture: string | null,
    displayPicture: string | null,
    subscription: ISubscription,
    subscription_name: string,
    files?: null | File[],
    spaceData: IUserSpaceData,
    totalFiles: number,
    totalDeletedFiles: number,
    totalSharedFiles: number
}

interface ISubscription {
    id: IdType,
    name: string,
    maxSpace: SpaceSizeType,
    displayMaxSpace: string,
    price: number,
    currency: string
}

interface IUserSpaceData {
    maxSpace: number,
    displayMaxSpace: string,
    usedSpace: number,
    displayUsedSpace: string
}


// files
interface IFile {
    readonly id: IdType,
    readonly path: string,
    readonly displayPath: string,
    readonly size: SpaceSizeType,
    readonly displaySize: string,
    readonly type: FileType,
    readonly user?: IUser,
    readonly user_id: IdType,
    readonly checkedBy: number,
    name: string,
    shareLink: string,
    isDeleted: 0 | 1,
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

