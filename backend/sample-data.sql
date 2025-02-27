-- Sample data for agorawin database
USE agorawin;

-- Sample users
INSERT INTO users (name, phone, email, pin, branch, is_active, join_date) VALUES
('Ahmed Ali', '+966 50 123 4567', 'ahmed@example.com', '1234', 'Main Branch', true, '2024-01-15 10:00:00'),
('Sara Ahmed', '+966 55 234 5678', 'sara@example.com', '5678', 'Downtown Branch', true, '2024-02-20 14:30:00'),
('Mohammed Hassan', '+966 50 987 6543', 'mohammed@example.com', '4321', 'Main Branch', true, '2024-03-01 09:15:00'),
('Fatima Omar', '+966 55 876 5432', 'fatima@example.com', '8765', 'Mall Branch', true, '2024-03-10 16:45:00'),
('Khalid Ibrahim', '+966 50 345 6789', 'khalid@example.com', '9876', 'Downtown Branch', true, '2024-03-15 11:20:00');

-- Sample stamp cards
INSERT INTO stamp_cards (name, serial_number, description, image_url, total_stamps, status) VALUES
('Coffee Loyalty Card', '1234567', 'Buy 9 coffees, get 1 free', 'https://api.dicebear.com/7.x/shapes/svg?seed=coffee', 10, 'inactive'),
('Breakfast Club Card', '7654321', 'Collect stamps for free breakfast', 'https://api.dicebear.com/7.x/shapes/svg?seed=breakfast', 8, 'active'),
('Lunch Special Card', '9876543', 'Earn free lunch after 10 stamps', 'https://api.dicebear.com/7.x/shapes/svg?seed=lunch', 10, 'inactive'),
('Tea Time Card', '5432109', 'Collect stamps for premium tea', 'https://api.dicebear.com/7.x/shapes/svg?seed=tea', 6, 'active');

-- Sample user stamp cards
INSERT INTO user_stamp_cards (user_id, stamp_card_id, current_stamps, activation_date) VALUES
(2, 2, 3, '2024-02-21 10:00:00'),
(4, 4, 4, '2024-03-11 14:30:00');

-- Sample gift cards
INSERT INTO gift_cards (name, serial_number, description, type, usage_limit, validity_days, status, expiry_date) VALUES
('Free Coffee', '12345', 'One free coffee of any size', 'Beverage', 1, 30, 'unclaimed', DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)),
('Discount Card', '67890', '20% off on any purchase', 'Discount', 1, 60, 'claimed', DATE_ADD(CURRENT_DATE, INTERVAL 60 DAY)),
('Birthday Special', '24680', 'Free birthday cake slice', 'Special', 1, 45, 'unclaimed', DATE_ADD(CURRENT_DATE, INTERVAL 45 DAY)),
('Lunch Deal', '13579', '50% off lunch menu', 'Meal', 1, 15, 'claimed', DATE_ADD(CURRENT_DATE, INTERVAL 15 DAY));

-- Sample user gift cards
INSERT INTO user_gift_cards (user_id, gift_card_id, claim_date) VALUES
(2, 2, '2024-02-25 15:30:00'),
(4, 4, '2024-03-12 12:45:00');

-- Sample policy pages content
UPDATE policy_pages SET content = 'This is a sample privacy policy...' WHERE slug = 'privacy-policy';
UPDATE policy_pages SET content = 'These are the terms of service...' WHERE slug = 'terms-of-service';
UPDATE policy_pages SET content = 'Our services include...' WHERE slug = 'service-definition';
UPDATE policy_pages SET content = 'Q: What is this?
A: This is a sample FAQ...' WHERE slug = 'faq';
