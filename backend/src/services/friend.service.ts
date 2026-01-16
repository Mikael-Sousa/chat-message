const friendModel = require('../models/friend.model')
const connection = require('../models/connection');
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

const acceptRequest = async (friendRequest: FriendRequest) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const request = await friendModel.findById(friendRequest.id, conn);

        if (!request) throw new Error("REQUEST_NOT_EXISTS");
        if (request.receiver_id !== friendRequest.receiverId) throw new Error("NOT_AUTHORIZED");
        if (request.status !== "pending") throw new Error("REQUEST_ALREADY_PROCESSED");

        await friendModel.updateStatus(
            {
                id: friendRequest.id,
                status: friendRequest.status
            }
        );

        await friendModel.createFriendship(
            request.sender_id,
            request.receiver_id,
            conn
        );

        await conn.commit();

        return {
            ...request,
            status: "accepted"
        };

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};


const updateFriendRequestStatus = async (friendRequest: FriendRequest) => {
    const request = await friendModel.findById(friendRequest.id);

    if (!request) {
        throw new Error("REQUEST_NOT_EXISTS");
    }

    if (request.receiver_id !== friendRequest.receiverId) {
        throw new Error("NOT_AUTHORIZED");
    }

    if (request.status !== "pending") {
        throw new Error("REQUEST_ALREADY_PROCESSED");
    }

    await friendModel.updateStatus({
        id: friendRequest.id,
        status: friendRequest.status
    });

    return {
        ...request,
        status: friendRequest.status
    };
};


module.exports = {
    sendFriendRequest,
    acceptRequest,
    updateFriendRequestStatus
}