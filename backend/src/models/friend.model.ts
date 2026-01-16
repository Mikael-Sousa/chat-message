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

module.exports = {
    sendFriendRequest,
    requestExists
}