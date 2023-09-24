export async function createTicket({ ticket, authContext }) {
    const { refreshToken, access_token, signOut } = authContext;

    try {
        const response = await fetch(`http://192.168.1.107:8080/api/ticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(ticket)
        });


        const status = response.status;

        if (status === 201) {
            return response;
        } 
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext = { ...authContext, access_token: new_token}
                return createTicket({ ticket, authContext });
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
