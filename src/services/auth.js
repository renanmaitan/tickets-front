export async function signIn({ username, password }) {
    try {
        const response = await fetch('http://192.168.43.201:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        const json = await response.json();

        if (json.access_token != null) {
            return json;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}