export async function getRoles( {authContext}  ) {
    if (!authContext)
        return null;

    const { refreshToken, access_token, signOut } = authContext;
    const IP = process.env.EXPO_PUBLIC_API_URL;
    try {
        const response = await fetch(`${IP}/api/auth/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
        const status = response.status;
        if (status === 200) {
            const json = await response.json();
            return json;
        } 
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext = { ...authContext, access_token: new_token}
                return getRoles(authContext);
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