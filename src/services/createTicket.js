export async function createTicket({ ticket, access_token }) {
    try {
        const response = await fetch('http://172.17.104.46:8080/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(ticket)
        });
        console.log(JSON.stringify(response));
        return response;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}