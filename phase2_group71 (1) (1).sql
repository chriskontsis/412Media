CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    fname VARCHAR(16),
    lname VARCHAR(16),
    email VARCHAR(30),
    password VARCHAR(20),
    hometown VARCHAR(20),
    gender VARCHAR(20),
    contribution INTEGER
);
CREATE TABLE Albums (
    Album_id SERIAL PRIMARY KEY,
    User_id INTEGER,
    Name VARCHAR(20),
    Date DATE,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);
CREATE TABLE Tags (
    Tag_id SERIAL PRIMARY KEY,
    Tag_name VARCHAR(20),
    Photo_id INTEGER,
    FOREIGN KEY (Photo_id) REFERENCES Photos(Photo_id)
);
CREATE TABLE Photos (
    Photo_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    Caption VARCHAR(50),
    Date DATE,
    Album_id INTEGER,
    imageUrl VARCHAR(10000),
    FOREIGN KEY (Album_id) REFERENCES Albums(Album_id) FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Likes (
    like_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    photo_id INTEGER,
    FOREIGN KEY user_id REFERENCES users(user_id),
    FOREIGN KEY photo_id REFERENCES photos(photo_id)
);
CREATE TABLE comments (
    c_id UUID PRIMARY KEY,
    user_id INTEGER,
    photo_id INTEGER,
    commentText VARCHAR(100),
    createdAt DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
);
CREATE TABLE friends (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    friend_id INTEGER,
    dayFormed DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
)
INSERT INTO Tags (tag_id, tag_name, photo_id)
VALUES (
        < current user > new_tag_id,
        < current user > tag_name,
        < current user > photo_id
    )
INSERT INTO Photos (photo_id, caption, date, album_id)
VALUES (
        < current user > photo_id,
        < current user > caption,
        date.now,
        < current user > album_id
    )
INSERT INTO Likes (user_id, photo_id)
VALUES (
        < current user > user_id,
        < current user > photo_id
    )
INSERT INTO Friends (user - id, friend_id, date)
VALUES(
        < current user > user_id,
        < current user > friend_id,
        < current user > date
    )
INSERT INTO Comments (comment_id, text, date, owner, photo_id)
VALUES (
        < current user > comment_id,
        < current user > text,
        date.now,
        < current user > owner,
        < current user > photo_id
    ) * / Becoming a Registered User (Check if user already exists)
SELECT COUNT(*)
FROM Users
WHERE user.email == input.email
SELECT *
FROM Users
WHERE name LIKE “ %inputString % ”
SELECT fname
FROM Users
WHERE user_id IN (
        SELECT friend_id
        FROM Friends
        WHERE user_id = < Current_user >.user_id
        SELECT data
        FROM Photos
        WHERE photo_id IN (
                SELECT photo_id
                FROM Photos,
                    Tags
                WHERE Photos.pid = Tags.pid
                    AND Tags.tname = { User inputed tag name }
            )
        SELECT data
        FROM Photos
        WHERE pid IN (
                SELECT pid
                FROM Photos,
                    Tags
                WHERE Tags.tname = { user input tags }
            )
        SELECT tag - name COUNT(tag - name) AS tname
        FROM Tags
        GROUP BY tag - name
        ORDER BY COUNT(tag - name) DESC
        LIMIT 5
        UPDATE Users
        SET contribution = contribution + 1
        WHERE user_id = < Current_user >.user_id
        SELECT *
        FROM ALBUMS
        WHERE albums.user_id = user_id
        SELECT data
        FROM Photos
        WHERE photo.album_id = user_album_id
        INSERT INTO Comments
        VALUES (photo_id, text, date, user_id)
        INSERT INTO Likes
        VALUES (user_id, photo_id)
        SELECT COUNT(*)
        FROM LIKES
            JOIN Photos ON likes.photo_id = Photos.photo_id
        SELECT user.id
        FROM User u
            INNER JOIN Friend f2 ON u.user_id = f2.friend_id
            INNER JOIN Friend f ON f2.user_id = f.friend_id
        WHERE f.user_id = < Current_User >.user_id
            AND f2.friend_id NOT IN (
                SELECT friend_id
                FROM Friends
                WHERE user_id = < Current_User >.user_id
                SELECT data CASE
                        WHERE recPhotoID = l1.user_id THEN l2.friend_id
                        WHERE recPhotoID = l2.friend_id THEN l1.user_id
                    END AS recPhotoID2
                FROM (
                        SELECT data CASE
                                WHERE rec_photos = l1.user_id then l2.friend_id
                                WHERE rec_photos = l2.friend_id then l1.user_id
                            END AS recPhotoID
                        FROM PHOTOS
                    ) AS recPhotoID3
                WHERE recPhotoID2 != rec_photos;