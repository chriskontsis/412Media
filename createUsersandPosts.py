import psycopg2

# Connection
conn = psycopg2.connect(
    host="localhost",
    database="mydatabase",
    user="myusername",
    password="mypassword"
)

# Create cursor
cur = conn.cursor()

# Defines the SQL queries to create Users and Albums tables
create_users_query = """
    CREATE TABLE Users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(20),
        password VARCHAR(20),
        fname VARCHAR(16),
        lname VARCHAR(16),
        email VARCHAR(30),
        hometown VARCHAR(20),
        gender VARCHAR(20),
        dob DATE,
        contribution INTEGER
    );
"""

create_albums_query = """
    CREATE TABLE Albums (
        Album_id SERIAL PRIMARY KEY,
        User_id INTEGER,
        Name VARCHAR(20),
        Date DATE,
        FOREIGN KEY (User_id) REFERENCES Users(User_id)
    );
"""

# Execute the queries to create Users and Albums tables
cur.execute(create_users_query)
cur.execute(create_albums_query)

# Define new user
insert_user_query = """
    INSERT INTO Users (username, password, fname, lname, email, hometown, gender, dob, contribution)
    VALUES ('johnsmith', 'mypassword', 'John', 'Smith', 'johnsmith@example.com', 'New York', 'Male', '1990-01-01', 0);
"""

# Execute new user
cur.execute(insert_user_query)

# Define new post
insert_post_query = """
    INSERT INTO Photos (user_id, caption, date, album_id, imageUrl)
    VALUES (1, 'This is my first post!', '2023-04-20', 1, 'https://example.com/image.jpg');
"""

# Execute new post
cur.execute(insert_post_query)

# Commit
conn.commit()

# Close cursor/connection
cur.close()
conn.close()
