const connection = require('../database/connection');
import type { Messages } from '../types/index'

const saveMessage = async (messages: Messages) => {
  const [result] = await connection.execute(
    `INSERT INTO messages (sender_id, receiver_id, content)
     VALUES (?, ?, ?)`,
    [messages.senderId, messages.receiverId, messages.content]
  );

  return result.insertId 
}

module.exports = { saveMessage };