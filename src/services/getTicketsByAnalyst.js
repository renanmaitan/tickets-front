export async function getTicketsByAnalyst( {authContext, filters, statusList } ) {
    if (!authContext)
        return null

    const { refreshToken, access_token, signOut } = authContext;
    const { page, size, sortBy, direction, userId } = filters;
    const IP = process.env.EXPO_PUBLIC_API_URL;
    
    try {
        const response = await fetch(`${IP}/api/ticket/analyst/${userId}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(statusList)
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
                return getTicketsByAnalyst(authContext);
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
