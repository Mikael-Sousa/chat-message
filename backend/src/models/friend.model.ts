const connection = require('./connection');
import type { FriendRequest } from '../types/index'

const requestExists = async (friendRequest: FriendRequest) => {
    const [rows] = await connection.execute(
        `SELECT id FROM friend_requests
     WHERE sender_id = ? AND receiver_id = ?
     LIMIT 1`,
        [friendRequest.senderId, friendRequest.receiverId]
    );

    return rows.length

};

const findById = async (id: number) => {
    const [rows] = await connection.execute(
        `SELECT * FROM friend_requests WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const sendFriendRequest = async (friendRequest: FriendRequest) => {
    const [result] = await connection.execute(
        `INSERT INTO friend_requests (sender_id, receiver_id)
   VALUES (?, ?)`,
        [friendRequest.senderId, friendRequest.receiverId]
    );

    return {
        id: result.insertId,
        senderId: friendRequest.senderId,
        receiverId: friendRequest.receiverId,
    };

};

const updateStatus = async (friendRequest: FriendRequest) => {
    const [result] = await connection.execute(
        `UPDATE friend_requests SET status = ? WHERE id = ?`,
        [friendRequest.status, friendRequest.id]
    );

    return result.affectedRows;
};

const createFriendship = async (
    userId: number,
    friendId: number,
    conn: any
) => {
    // A => B
    await conn.execute(
        `INSERT INTO friends (user_id, friend_id)
     VALUES (?, ?)`,
        [userId, friendId]
    );

    // B => A
    await conn.execute(
        `INSERT INTO friends (user_id, friend_id)
     VALUES (?, ?)`,
        [friendId, userId]
    );
};

module.exports = {
    requestExists,
    findById,
    sendFriendRequest,
    updateStatus,
    createFriendship
}