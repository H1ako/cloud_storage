export async function getUserData() {
    const response = await fetch('/profile', {
        method: 'GET',
    })

    const data: IUserRequest = await response.json()

    return data
}