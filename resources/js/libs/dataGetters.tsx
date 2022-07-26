export async function getUserData() {
    const response = await fetch('/profile', {
        method: 'GET',
    })

    const data: IUserRequest = await response.json()

    return data
}

export async function getUserSpaceData() {
    const response = await fetch('/profile/space', {
        method: 'GET',
    })

    const data: IUserSpaceRequest = await response.json()

    return data
}