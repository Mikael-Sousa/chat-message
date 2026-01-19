CREATE TABLE friend_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_friend_requests_sender
    FOREIGN KEY (sender_id) REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_friend_requests_receiver
    FOREIGN KEY (receiver_id) REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_friend_request
    UNIQUE (sender_id, receiver_id)
);
