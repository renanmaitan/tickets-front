export async function signIn({ username, password }) {
    try {
        const response = await fetch(`http://192.168.1.107:8080/api/auth/login`, {
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