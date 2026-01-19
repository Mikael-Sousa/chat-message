CREATE TABLE friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_friends_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_friends_friend
    FOREIGN KEY (friend_id) REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_friendship
    UNIQUE (user_id, friend_id)
);
