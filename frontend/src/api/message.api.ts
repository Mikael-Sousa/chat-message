export interface Messages {
    id?: number,
    sender_id?: number,
    receiver_id?: number,
    content?: string,
    status?: string,
    created_at?: Date

}


export const getMessages = async (
    { token, messages }:
        { token: string; messages: Messages }) => {
    if (!token) {
        throw new Error("Token não encontrado");
    }
    try {
        const res = await fetch(`http://localhost:4000/friends/request/${messages.receiver_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};