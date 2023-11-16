export async function getRelatory( authContext, data ) {
    if (!authContext)
        throw new Error('AuthContext is required in getRelatory service');
    console.log(data);
    const {departmentId, startDate, endDate} = data;
    const { refreshToken, access_token, signOut } = authContext;
    const IP = process.env.EXPO_PUBLIC_API_URL;
    try {
        const response = await fetch(`${IP}/api/ticket/relatory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({departmentId, startDate, endDate})
        });
        const status = response.status;
        console.log(status);
        if (status === 200) {
            const json = await response.json();
            return json;
        } 
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext =  { ...authContext, access_token: new_token}
                return getRelatory(authContext);
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