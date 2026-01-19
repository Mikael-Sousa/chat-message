const friendModel = require('../models/friend.model')
const connection = require('../models/connection');
import type { FriendRequest } from '../types/index'

const listUserFriends = async (userId: number) => {
    const friends = await friendModel.listUserFriends(userId);

    if (!friends) {
        return { status: 400, message: "Request failed" };
    }

    return {
        status: 200,
        data: friends,
    };
}

const sendFriendRequest = async (friendRequest: FriendRequest) => {

    if (!friendRequest.senderId || !friendRequest.receiverId) {
        return { status: 400, message: "senderId or receiverId is required" };
    }

    if (friendRequest.senderId === friendRequest.receiverId) {
        return { status: 400, message: "You cannot send a request to yourself" };
    }

    const requestExists = await friendModel.requestExists({
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId
    })

    if (requestExists > 0) {
        return { status: 409, message: "Request already exists" };
    }

    const request = await friendModel.sendFriendRequest({
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId
    })

    if (!request) {
        return { status: 400, message: "Request failed" };
    }

    return {
        status: 201,
        message: "Friend request sent",
        data: request,
    };
}

const acceptRequest = async (friendRequest: FriendRequest) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const request = await friendModel.findById(friendRequest.id, conn);

        if (!request) {
            return { status: 404, message: "Friend request not found" };
        }

        if (request.receiver_id !== friendRequest.receiverId) {
            return { status: 403, message: "Not authorized" };
        }

        if (request.status !== "pending") {
            return { status: 409, message: "Request already processed" };
        }

        await friendModel.updateStatus({
            id: friendRequest.id,
            status: "accepted",
        });

        await friendModel.createFriendship(
            request.sender_id,
            request.receiver_id,
            conn
        );

        await conn.commit();

        return {
            status: 200,
            data: {
                ...request,
                status: "accepted",
            },
        };

    } catch (err) {
        await conn.rollback();
        return { status: 500, message: "Internal server error" };
    } finally {
        conn.release();
    }
};

const updateFriendRequestStatus = async (friendRequest: FriendRequest) => {
    const request = await friendModel.findById(friendRequest.id);

    if (!request) {
        return { status: 404, message: "Friend request not found" };
    }

    if (request.receiver_id !== friendRequest.receiverId) {
        return { status: 403, message: "Not authorized" };
    }

    if (request.status !== "pending") {
        return { status: 409, message: "Request already processed" };
    }

    await friendModel.updateStatus({
        id: friendRequest.id,
        status: friendRequest.status,
    });

    return {
        status: 200,
        data: {
            ...request,
            status: friendRequest.status,
        },
    };
};


module.exports = {
    listUserFriends,
    sendFriendRequest,
    acceptRequest,
    updateFriendRequestStatus
}