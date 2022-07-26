// users
interface IUser {
    id: number | string,
    email: string,
    picture?: string | null,
    subscription: ISubscription,
    files?: null | File[]
}

interface ISubscription {
    id: number | string,
    name: string,
    space: number | string,
    price: number,
    currency: string
}


// files
interface IFile {
    id: number | string,
    file: string,
    name: string,
    size: number,
    type: FileType,
    shareLink: string
    user?: number | IUser
}

// requests
interface IRequest {
    status: 'success' | 'error',
}

interface IUserRequest extends IRequest {
    user: IUser
}