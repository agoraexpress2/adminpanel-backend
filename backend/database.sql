-- Create the database
CREATE DATABASE IF NOT EXISTS agorawin;
USE agorawin;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255),
  pin VARCHAR(4) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Stamp cards table
CREATE TABLE stamp_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  serial_number VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(255),
  total_stamps INT NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'inactive',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User stamp cards table
CREATE TABLE user_stamp_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  stamp_card_id INT NOT NULL,
  current_stamps INT DEFAULT 0,
  activation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (stamp_card_id) REFERENCES stamp_cards(id)
);

-- Gift cards table
CREATE TABLE gift_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  serial_number VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  type VARCHAR(50),
  usage_limit INT DEFAULT 1,
  validity_days INT DEFAULT 30,
  status ENUM('unclaimed', 'claimed', 'used') DEFAULT 'unclaimed',
  expiry_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User gift cards table
CREATE TABLE user_gift_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  gift_card_id INT NOT NULL,
  claim_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  used_date DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (gift_card_id) REFERENCES gift_cards(id)
);

-- Policy pages table
CREATE TABLE policy_pages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default policy pages
INSERT INTO policy_pages (title, slug, content) VALUES
('Privacy Policy', 'privacy-policy', ''),
('Terms of Service', 'terms-of-service', ''),
('Service Definition', 'service-definition', ''),
('FAQ', 'faq', '');
