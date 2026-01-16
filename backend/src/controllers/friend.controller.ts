const friendService = require('../services/friend.service')

const sendFriendRequest = async (req: any, res: any) => {
    try {
        const senderId = req.user.id
        const { receiverId } = req.body

        const request = await friendService.sendFriendRequest({ senderId, receiverId })

        return res.status(200).json({ request })

    } catch (err: any) {

        console.error(err)

        if (err.message === "SENDER_ID_REQUIRED || RECEIVER_ID_REQUIRED") {
            return res.status(400).json({ message: "!senderId or !receiverId" });
        }

        if (err.message === "REQUEST_SENT_TO_YOURSELF") {
            return res.status(400).json({ message: "You cannot send a request to yourself" });
        }

        if (err.message === "REQUEST_ALREADY_EXISTS") {
            return res.status(400).json({ message: "Request already exists" });
        }

        if (err.message === "REQUEST_FAILED") {
            return res.status(400).json({ message: "Request failed" });
        }

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

        if (status === "accepted") {
            const request = await friendService.acceptRequest({
                id,
                receiverId,
                status,
            });
            return res.status(200).json(request);
        } else {
            const request = await friendService.updateFriendRequestStatus({
                id,
                receiverId,
                status,
            });
            return res.status(200).json(request);
        }

    } catch (err: any) {
        console.error(err);

        if (err.message === "REQUEST_NOT_EXISTS") {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (err.message === "NOT_AUTHORIZED") {
            return res.status(403).json({ message: "Not authorized to update this request" });
        }

        if (err.message === "REQUEST_ALREADY_PROCESSED") {
            return res.status(409).json({ message: "Request already processed" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    sendFriendRequest,
    updateFriendRequestStatus
}