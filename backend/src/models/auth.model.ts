const connection = require('./connection');
import type { User } from '../types/index';

const findByEmail = async (email: string) => {
  const [ rows ] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )
  return rows[0] || null
};

const registerNewUser = async (user: User): Promise<{insertId: number}>=> {
  const [ rows ] = await connection.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
  [user.username, user.email, user.password]);
  return {insertId: rows.insertId}
}

module.exports = {
  findByEmail,
  registerNewUser
};