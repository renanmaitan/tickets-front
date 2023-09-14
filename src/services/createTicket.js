export async function createTicket({ ticket, access_token }) {
    try {
        const response = await fetch('http://192.168.0.12:8080/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(ticket)
        });

        console.log("POST RESPONSE: "+JSON.stringify(response));
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}