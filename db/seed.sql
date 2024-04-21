-- Insert Users
INSERT INTO Users (username, email, password) VALUES
('AlexMason', 'alex.mason@example.com', 'placeholder for encrypt'), 
('SamiraRai', 'samira.rai@example.com', 'placeholder for encrypt'), 
('ElenaTorres', 'elena.torres@example.com', 'placeholder for encrypt'); 

-- Insert Posts
INSERT INTO Posts (title, content, userId) VALUES
('Exploring the World of React', 'Dive into the capabilities and best practices of using React in modern web development.', 1),
('The Future of AI in Healthcare', 'An in-depth look at how artificial intelligence is revolutionizing healthcare.', 2),
('Photography Tips for Beginners', 'Learn some simple techniques to enhance your photography skills.', 3);

-- Insert Comments
INSERT INTO Comments (content, postId, userId) VALUES
('This was a great read! Can you share more on React hooks?', 1, 2),
('Incredible insights, looking forward to more on this topic!', 2, 3),
('Thanks for the tips, they really helped improve my shots!', 3, 1);