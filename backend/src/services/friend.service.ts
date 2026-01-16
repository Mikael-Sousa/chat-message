const friendModel = require('../models/friend.model')
import type { FriendRequest } from '../types/index'

const sendFriendRequest = async (friendRequest: FriendRequest) => {

    if (!friendRequest.senderId || !friendRequest.receiverId) {
        throw new Error("SENDER_ID_REQUIRED || RECEIVER_ID_REQUIRED");
    }

    if (friendRequest.senderId === friendRequest.receiverId) {
        throw new Error("REQUEST_SENT_TO_YOURSELF");
    }

    const requestExists = await friendModel.requestExists({
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId
    })

    if (requestExists > 0) {
        throw new Error("REQUEST_ALREADY_EXISTS");
    }

    const request = await friendModel.sendFriendRequest({
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId
    })

    if (!request) {
        throw new Error("REQUEST_FAILED");
    }

    return request
}

module.exports = {
    sendFriendRequest,
}