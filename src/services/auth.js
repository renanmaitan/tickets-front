export async function signIn({ username, password }) {
    const IP = process.env.EXPO_PUBLIC_API_URL;
    try {
        const response = await fetch(`${IP}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        const status = response.status;
        const json = await response.json();

        if (status == 200) {
            return json;
        } 
        return false;
    } catch (error) {
        throw error;
    }
}