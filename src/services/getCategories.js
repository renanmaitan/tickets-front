export async function getCategories( authContext, departmentId  ) {
    if (!authContext)
        throw new Error('AuthContext is required in getCategories service');

    const { refreshToken, access_token, signOut } = authContext;
    const IP = process.env.EXPO_PUBLIC_API_URL;
    try {
        const response = await fetch(`${IP}/api/categories/department/${departmentId}/active`, {
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
                authContext =  { ...authContext, access_token: new_token}
                return getStatus(authContext);
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