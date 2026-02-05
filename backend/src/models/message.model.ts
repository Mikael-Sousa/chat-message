const connection = require('../database/connection');
import type { Messages } from '../types/index'

const getMessages = async (messages: Messages) => {
  const [rows] = await connection.execute(
    `
    SELECT *
    FROM messages
    WHERE 
      (sender_id = ? AND receiver_id = ?)
      OR
      (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
    `,
    [
      messages.senderId,
      messages.receiverId,
      messages.receiverId,
      messages.senderId,
    ]
  );

  return rows;
};


const saveMessage = async (messages: Messages) => {
  const [result] = await connection.execute(
    `INSERT INTO messages (sender_id, receiver_id, content)
     VALUES (?, ?, ?)`,
    [messages.senderId, messages.receiverId, messages.content]
  );

  return result.insertId
}

module.exports = {
  saveMessage,
  getMessages
};