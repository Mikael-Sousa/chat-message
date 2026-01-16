const connection = require('./connection');

const findProfileByUserId = async (userId: number) => {
  const [rows] = await connection.execute(
    `
    SELECT 
      u.username,
      p.avatar_url
    FROM users u
    LEFT JOIN user_profiles p ON p.user_id = u.id
    WHERE u.id = ?
    `,
    [userId]
  );

  return rows[0];
};

const findProfileByUsername = async (username: string) => {
  const [rows] = await connection.execute(
    `
  SELECT 
    u.username,
    p.avatar_url
  FROM users u
  LEFT JOIN user_profiles p ON p.user_id = u.id
  WHERE u.username = ?
  `,
    [username]
  );

  return rows[0] || null;

};


module.exports = {
  findProfileByUserId, 
  findProfileByUsername,
}