export default async function createTicket( ticket, token ) {
    try {

        const response = await fetch('http://172.17.109.50:8080/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                ticket
            )
        });
       
        return await response.json();

    } catch (error) {
        console.error(error);
        throw error;
    }
}