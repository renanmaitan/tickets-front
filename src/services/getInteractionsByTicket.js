export async function getInteractionsByTicket({ ticketId, authContext }) {
    if (authContext === undefined) {
        throw new Error("AuthContext is undefined in getInteractionsByTicket");
    }

    const { refreshToken, access_token, signOut } = authContext;

    const IP = process.env.EXPO_PUBLIC_API_URL;

    try {
        const response = await fetch(`${IP}/api/interaction/${ticketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
        });


        const status = response.status;

        if (status === 200) {
            json = await response.json();
            return json;
        } 
        else if (status === 401) {
            const new_token = await refreshToken();
            if (new_token) {
                authContext = { ...authContext, access_token: new_token}
                return getInteractionsByTicket({ ticketId, authContext });
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
