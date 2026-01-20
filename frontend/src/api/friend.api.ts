export interface FriendRequest {
    id?: number;
    senderId?: number;
    receiverId: number;
    status?: "accepted" | "rejected";
}

export const listFriendsAPI = async (token: string) => {
    if (!token) {
        throw new Error("Token não encontrado");
    }

    const res = await fetch("http://localhost:4000/friends/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const sendFriendRequestAPI = async ({ token, friendRequest }: { token: string; friendRequest: FriendRequest }) => {
    if (!token) {
        throw new Error("Token não encontrado");
    }
    try {
        const res = await fetch("http://localhost:4000/friends/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                receiverId: friendRequest.receiverId
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Erro ao logar");
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateFriendRequestStatus = async (
    { token, id, friendRequest }:
        { token: string; id: number; friendRequest: FriendRequest }) => {
    if (!token) {
        throw new Error("Token não encontrado");
    }
    try {
        const res = await fetch(`http://localhost:4000/friends/request/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                status: friendRequest.status
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Erro ao logar");
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};