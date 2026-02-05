CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,

  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,

  content TEXT NOT NULL,

  is_read BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_messages_sender
    FOREIGN KEY (sender_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_messages_receiver
    FOREIGN KEY (receiver_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
