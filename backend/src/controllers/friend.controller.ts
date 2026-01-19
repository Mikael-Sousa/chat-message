const friendService = require('../services/friend.service')

const listFriends = async (req: any, res: any) => {
    try {
        const userId = req.user.id

        const result = await friendService.listUserFriends(userId)

        return res.status(result.status).json(result);

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const sendFriendRequest = async (req: any, res: any) => {
    try {
        const senderId = req.user.id
        const { receiverId } = req.body

        const result = await friendService.sendFriendRequest({ senderId, receiverId })

        return res.status(result.status).json(result);

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateFriendRequestStatus = async (req: any, res: any) => {
    try {
        const id = Number(req.params.id);
        const receiverId = req.user.id;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Invalid request id" });
        }

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const result =
            status === "accepted"
                ? await friendService.acceptRequest({ id, receiverId, status })
                : await friendService.updateFriendRequestStatus({ id, receiverId, status });

        return res.status(result.status).json(result);

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    listFriends,
    sendFriendRequest,
    updateFriendRequestStatus
}