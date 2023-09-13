export async function signIn({ username, password }) {
    try {
        const response = await fetch('http://172.17.109.50:8080/api/auth/login', {
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