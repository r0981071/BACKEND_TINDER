USE tinder;

-- USERS (including admin + 20 new)
INSERT INTO `user` (user_id, username, password) VALUES
(1, 'admin', 'admin1234'),
(2, 'alex', 'pass1'),
(3, 'brian', 'pass2'),
(4, 'carlos', 'pass3'),
(5, 'dana', 'pass4'),
(6, 'emma', 'pass5'),
(7, 'fiona', 'pass6'),
(8, 'george', 'pass8'),
(9, 'hannah', 'pass9'),
(10, 'ian', 'pass10'),
(11, 'julia', 'pass11'),
(12, 'kyle', 'pass12'),
(13, 'laura', 'pass13'),
(14, 'mike', 'pass14'),
(15, 'nina', 'pass15'),
(16, 'oscar', 'pass16'),
(17, 'paula', 'pass17'),
(18, 'quinn', 'pass18'),
(19, 'rachel', 'pass19'),
(20, 'steve', 'pass20'),
(21, 'tia', 'pass21'),
(22, 'vince', 'pass22'),
(23, 'wendy', 'pass23'),
(24, 'xander', 'pass24'),
(25, 'yvonne', 'pass25'),
(26, 'zach', 'pass26');

-- PROFILES (skip admin user_id=1)
INSERT INTO `profile` (profile_id, name, gender_male, age, nationallity, height, weight, bio, profile_pic_url) VALUES
(2, 'Alex', true, 25, 'USA', 1.80, 75.0, 'I like hiking', 'https://picsum.photos/seed/alex/200'),
(3, 'Brian', true, 27, 'Canada', 1.75, 78.0, 'Coffee addict', 'https://picsum.photos/seed/brian/200'),
(4, 'Carlos', true, 24, 'Mexico', 1.70, 70.0, 'Soccer fan', 'https://picsum.photos/seed/carlos/200'),
(5, 'Dana', false, 22, 'USA', 1.65, 60.0, 'Book lover', 'https://picsum.photos/seed/dana/200'),
(6, 'Emma', false, 26, 'UK', 1.70, 62.0, 'Dog mom', 'https://picsum.photos/seed/emma/200'),
(7, 'Fiona', false, 23, 'Germany', 1.68, 58.0, 'Music is life', 'https://picsum.photos/seed/fiona/200'),
(8, 'George', true, 30, 'France', 1.82, 80.0, 'Chef', 'https://picsum.photos/seed/george/200'),
(9, 'Hannah', false, 28, 'Italy', 1.66, 57.0, 'Artist', 'https://picsum.photos/seed/hannah/200'),
(10, 'Ian', true, 31, 'USA', 1.78, 82.0, 'Fitness junkie', 'https://picsum.photos/seed/ian/200'),
(11, 'Julia', false, 24, 'Spain', 1.62, 55.0, 'Traveler', 'https://picsum.photos/seed/julia/200'),
(12, 'Kyle', true, 29, 'Australia', 1.85, 85.0, 'Gamer', 'https://picsum.photos/seed/kyle/200'),
(13, 'Laura', false, 27, 'Canada', 1.67, 59.0, 'Yoga lover', 'https://picsum.photos/seed/laura/200'),
(14, 'Mike', true, 33, 'UK', 1.80, 83.0, 'Musician', 'https://picsum.photos/seed/mike/200'),
(15, 'Nina', false, 26, 'Sweden', 1.70, 60.0, 'Photographer', 'https://picsum.photos/seed/nina/200'),
(16, 'Oscar', true, 32, 'Brazil', 1.77, 78.0, 'Footballer', 'https://picsum.photos/seed/oscar/200'),
(17, 'Paula', false, 29, 'Portugal', 1.65, 58.0, 'Chef', 'https://picsum.photos/seed/paula/200'),
(18, 'Quinn', true, 28, 'USA', 1.80, 76.0, 'Developer', 'https://picsum.photos/seed/quinn/200'),
(19, 'Rachel', false, 31, 'USA', 1.68, 62.0, 'Dancer', 'https://picsum.photos/seed/rachel/200'),
(20, 'Steve', true, 35, 'Germany', 1.83, 85.0, 'Engineer', 'https://picsum.photos/seed/steve/200'),
(21, 'Tia', false, 23, 'Brazil', 1.65, 55.0, 'Student', 'https://picsum.photos/seed/tia/200'),
(22, 'Vince', true, 34, 'Japan', 1.75, 72.0, 'Designer', 'https://picsum.photos/seed/vince/200'),
(23, 'Wendy', false, 27, 'Netherlands', 1.68, 60.0, 'Baker', 'https://picsum.photos/seed/wendy/200'),
(24, 'Xander', true, 29, 'USA', 1.82, 80.0, 'Photographer', 'https://picsum.photos/seed/xander/200'),
(25, 'Yvonne', false, 30, 'Norway', 1.66, 57.0, 'Nurse', 'https://picsum.photos/seed/yvonne/200'),
(26, 'Zach', true, 32, 'USA', 1.79, 75.0, 'Writer', 'https://picsum.photos/seed/zach/200');

-- SWIPES (random likes/dislikes)
INSERT INTO `swipes` (swipe_id, swiper_id, swiped_id, is_like) VALUES
(1, 2, 5, true),
(2, 3, 6, false),
(3, 4, 2, true),
(4, 8, 9, true),
(5, 9, 8, true),
(6, 10, 11, true),
(7, 11, 10, true),
(8, 12, 13, true),
(9, 13, 12, false),
(10, 14, 15, true);

-- MATCHES (only those with mutual likes)
INSERT INTO `matches` (match_id, user1_id, user2_id) VALUES
(1, 8, 9),
(2, 10, 11);

-- CONVERSATIONS
INSERT INTO `conversations` (conversation_id, user1_id, user2_id) VALUES
(1, 8, 9),
(2, 10, 11);

-- MESSAGES for those conversations
INSERT INTO `messages` (message_id, conversation_id, sender_id, receiver_id, content) VALUES
(1, 1, 8, 9, 'Hey Hannah! How’s it going?'),
(2, 1, 9, 8, 'All good! You?'),
(3, 2, 10, 11, 'Hi Julia, coffee sometime?'),
(4, 2, 11, 10, 'Sure, sounds great!');
