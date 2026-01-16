const friendService = require('../services/friend.service')

const sendFriendRequest = async (req: any, res: any) => {
    try {
        const senderId = req.user.id
        const { receiverId } = req.body

        const request = await friendService.sendFriendRequest({senderId, receiverId})

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

module.exports = {
    sendFriendRequest,
}