export async function getLoggedUser({access_token, refreshToken, signOut}) {
    if (access_token === undefined) {
        throw new Error("Access token is undefined in getLoggedUser");
    }

    const IP = process.env.EXPO_PUBLIC_API_URL;
    
    try {
        const response = await fetch(`${IP}/api/users/logged`, {
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
                return getLoggedUser(authContext);
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
