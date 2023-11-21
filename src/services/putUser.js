export async function putUser(authContext, user) {
    if (!authContext)
        return null;

    const { refreshToken, access_token, signOut } = authContext;
    const IP = process.env.EXPO_PUBLIC_API_URL;

    try {
        const response = await fetch(`${IP}/api/users/{userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(user)
        });

        const status = response.status;
        if (status === 200) {
            const json = await response.json();
            return json;
        }
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext = { ...authContext, access_token: new_token }
                return putUser(authContext, user);
            } else {
                signOut();
                return null;
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}