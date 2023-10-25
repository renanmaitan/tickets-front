export async function putTicket( {authContext, ticket } ) {
    if (!authContext)
        throw new Error('AuthContext is required in putTicket service');

    const { refreshToken, access_token, signOut } = authContext;
    const IP = process.env.EXPO_PUBLIC_API_URL;
    
    try {
        const response = await fetch(`${IP}/api/ticket/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(ticket)
        });
        
        const status = response.status;
        console.log("Resposta: "+JSON.stringify(response))
        console.log("Ticket: "+JSON.stringify(ticket))
        if (status === 200) {
            const json = await response.json();
            return json;
        } 
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext = { ...authContext, access_token: new_token}
                return putTicket(authContext);
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