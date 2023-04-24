-- /register endpoint - Insert new user data into the users table
INSERT INTO users (username, pwd, fname, lname, email, hometown, gender, dob, contribution)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- /login endpoint - Select user data by username
SELECT * FROM users WHERE username = $1;

-- / endpoint - Select photo data and user information
SELECT p.*,  u.user_id AS userId, fname, username
FROM Photos as p
JOIN users AS u ON (p.user_id = u.user_id)
ORDER BY p.postdate DESC;

-- /tags endpoint - Select tags by photo_id
SELECT tag_id, tag_text
FROM tags
WHERE tags.photo_id = $1;

-- /comments endpoint - Select comments and user information by photo_id
SELECT c.*,  u.user_id AS userId, fname, username
FROM comments as c
JOIN users AS u ON (c.user_id = u.user_id)
WHERE c.photo_id = $1
ORDER BY c.createdAt DESC;

-- /comments endpoint - Insert a new comment
INSERT INTO comments (user_id, photo_id, commenttext, createdat)
VALUES ($1, $2, $3, CURRENT_DATE)
RETURNING *;

-- /comments endpoint - Update user contribution count
UPDATE users SET contribution = contribution + 1 WHERE users.user_id = $1;

-- /likes endpoint - Select user_id from likes by photo_id
SELECT user_id FROM likes WHERE photo_id = $1;

-- /likes endpoint - Insert a new like
INSERT INTO likes (photo_id, user_id)
VALUES ($1, $2);

-- /likes endpoint - Delete a like
DELETE FROM likes WHERE user_id = $1 AND photo_id = $2;

-- /postLikes endpoint - Select usernames who liked a post
SELECT username
FROM users AS u
JOIN likes AS l ON (l.user_id = u.user_id)
WHERE l.photo_id = $1;

-- Endpoint: app.get("/getTaggedPosts")
SELECT photos.*, users.username
FROM photos
JOIN users ON photos.user_id = users.user_id
WHERE photo_id IN (
  SELECT photo_id
  FROM (
    SELECT photo_id, string_agg(tag_text, ' ') AS tagg
    FROM tags
    WHERE user_id = ${userId}
    GROUP BY photo_id
  ) AS grouped_tags
  WHERE 
  -- Conditions for searching tags
);

-- Endpoint: app.get("/comments")
SELECT c.*,  u.user_id AS userId, fname, username
FROM comments as c 
JOIN users AS u ON (c.user_id = u.user_id) 
WHERE c.photo_id = $1  
ORDER BY c.createdAt DESC;

-- Endpoint: app.post("/comments")
INSERT INTO comments (user_id, photo_id, commenttext, createdat) VALUES ($1, $2, $3, CURRENT_DATE) RETURNING *;

-- Update user contribution
UPDATE users SET contribution = contribution + 1 WHERE users.user_id = $1;

-- Endpoint: app.get("/likes")
SELECT user_id FROM likes WHERE photo_id = $1;

-- Endpoint: app.post("/likes")
INSERT INTO likes (photo_id, user_id) VALUES ($1, $2);

-- Endpoint: app.delete("/likes")
DELETE FROM likes WHERE user_id = $1 AND photo_id = $2;

-- Endpoint: app.get("/contribution")
SELECT username, contribution FROM users ORDER BY contribution DESC LIMIT 10;

-- Endpoint: app.get("/searchComments")
SELECT COUNT(users.user_id) as ocurr, fname, lname FROM users 
JOIN comments as c 
ON (users.user_id = c.user_id)
WHERE c.commentText LIKE concat('%', $1::text, '%')
GROUP BY users.user_id
ORDER BY ocurr DESC;


-- /searchTags
SELECT p.*, u.username
FROM photos AS p
JOIN Tags AS t ON t.photo_id = p.photo_id
JOIN Users AS u ON u.user_id = p.user_id
WHERE t.tag_text LIKE concat('%', $1::text, '%');

-- /getFriends
SELECT
    f.friend_id,
    u.fname AS friend_fname,
    u.lname AS friend_lname
FROM
    friends AS f
JOIN
    users AS u
ON
    f.friend_id = u.user_id
WHERE
    f.user_id = $1;

-- /friendsOfFriends
SELECT
    u.*
FROM
    users u
    INNER JOIN friends ff ON u.user_id = ff.friend_id
    INNER JOIN friends f ON ff.user_id = f.friend_id
WHERE
    f.user_id = $1
    AND ff.friend_id NOT IN
    (SELECT friend_id FROM friends WHERE user_id = $1);

-- /posts/:postId (DELETE)
DELETE FROM Photos WHERE Photo_id = $1;

-- /removeFriend (DELETE)
DELETE FROM friends
WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1);

-- /addFriend (POST)
INSERT INTO friends (id, user_id, friend_id, dayFormed) VALUES ($1, $2, $3, CURRENT_DATE);


-- SQL Queries from "addFriendByUsername" endpoint

-- Get the next id for friends table
SELECT max(id) + 1 AS next_id FROM friends;

-- Get friend_id by friendUsername
SELECT user_id FROM users WHERE username = [friendUsername];

-- Insert a new record in friends table
INSERT INTO friends (id, user_id, friend_id, dayFormed) VALUES ([newId], [userId], [fid], CURRENT_DATE);

-- SQL Queries from "checkFriendship" endpoint

-- Check if two users are friends or not
SELECT * FROM friends WHERE (user_id = [user_id] AND friend_id = [friend_id]) OR (user_id = [friend_id] AND friend_id = [user_id]);

-- SQL Queries from "createAlbum" endpoint

-- Get the next album_id for albums table
SELECT max(album_id) + 1 AS next_id FROM albums;

-- Insert a new record in albums table
INSERT INTO albums (album_id, user_id, name, date) VALUES ([newId], [user_id], [name], [date]);

-- SQL Queries from "contribution" endpoint

-- Get top 10 users with highest contribution
SELECT username, contribution FROM users ORDER BY contribution DESC LIMIT 10;

-- SQL Queries from "searchComments" endpoint

-- Get the occurrences and names of users who have the input text in their comments
SELECT COUNT(users.user_id) as ocurr, fname, lname FROM users 
JOIN comments as c 
ON (users.user_id = c.user_id)
WHERE c.commentText LIKE concat('%', [input]::text, '%')
GROUP BY users.user_id
ORDER BY ocurr DESC;


-- Endpoint: /popularTags
SELECT COUNT(tag_text) as tagcount, tag_text
FROM tags
GROUP BY (tag_text)
ORDER BY tagcount DESC
LIMIT 5

-- Endpoint: /findUsername
SELECT username FROM users WHERE user_id = $1

-- Endpoint: /findAlbums
SELECT * FROM albums
WHERE user_id = $1

-- Endpoint: /profilePosts
SELECT p.*, username
FROM photos AS p
JOIN users AS u ON (u.user_id = p.user_id)
WHERE p.user_id = $1
ORDER BY p.postdate DESC

-- Endpoint: /getUsernameInfo
SELECT * FROM users WHERE username LIKE concat('%', $1::text, '%')

-- Endpoint: /findAlbumPosts
-- First query
SELECT album_id FROM albums WHERE user_id = $1 AND name = $2

-- Second query
SELECT p.*, username
FROM photos AS p
JOIN users AS u ON (p.user_id = u.user_id)
WHERE p.user_id = $1
AND p.album_id = $2

-- Endpoint: /deleteAlbum
DELETE FROM albums WHERE album_id = $1

-- Endpoint: /addPhoto
-- First query
SELECT album_id
FROM albums
WHERE name = $1

-- Second query
INSERT INTO photos (user_id, caption, postdate, album_id, imageurl)
VALUES ($1, $2, CURRENT_DATE, $3, $4) RETURNING photo_id

-- Third query (inside loop)
INSERT INTO tags (tag_text, photo_id, user_id) VALUES ($1, $2, $3)

-- Fourth query
UPDATE users SET contribution = contribution + 1 WHERE users.user_id = $1

-- Endpoint: /updateUserInfo
UPDATE users
SET ${field} = $1
WHERE user_id = $2 RETURNING *
