const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Enable CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Parse incoming JSON payloads
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
const contribution = 0;
// Route for user registration
app.post("/register", async (req, res) => {
  try {
    // Destructure user data from the request body
    console.log(req.body);
    const id = 1011;
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      hometown,
      gender,
      dateOfBirth,
    } = req.body;
    const contrib = 0;
    // Insert new user data into the users table
    const newUser = await pool.query(
      "INSERT INTO users (username, pwd, fname, lname, email, hometown, gender, dob, contribution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        username,
        password,
        firstName,
        lastName,
        email,
        hometown,
        gender,
        dateOfBirth,
        contrib,
      ]
    );

    res.json(newUser.rows[0]);
    console.log("post");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND pwd = $2",
      [username, password]
    );
    if (result.rowCount === 1) {
      const token = jwt.sign({ id: result.rows[0].user_id }, "password");
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(result.rows[0]);
    } else {
      res.status(404).json("Input Info is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
});

app.get("/", async (req, res) => {
  const token = req.cookies.accessToken;
  let id = -1;
  if (!token) res.status(401).json("Not logged in");
  jwt.verify(token, "password", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid");
    id = userInfo.id;
  });
  try {
    const result = await pool.query(
      `SELECT p.*,  u.user_id AS userId, fname, username
      FROM Photos as p 
      JOIN users AS u ON (p.user_id = u.user_id)  
      LEFT JOIN friends AS f ON (p.user_id = f.friend_id)
      WHERE f.user_id = $1 OR p.user_id = $2
      ORDER BY p.postdate DESC`,
      [id, id]
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get("/tags", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tag_id, tag_text
      FROM tags
      WHERE tags.photo_id = $1`,
      [req.query.postId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get("/comments", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*,  u.user_id AS userId, fname, username
      FROM comments as c 
      JOIN users AS u ON (c.user_id = u.user_id) 
      WHERE c.photo_id = $1  
      ORDER BY c.createdAt DESC`,
      [req.query.postId]
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.post("/comments", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  let userId = -1;
  jwt.verify(token, "password", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");
    userId = userInfo.id;
  });

  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO comments (user_id, photo_id, commenttext, createdat) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, req.body.postId, req.body.desc, "2023-4-13"]
    );

    await pool.query(
      "UPDATE users SET contribution = contribution + 1 WHERE users.user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/likes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id FROM likes WHERE photo_id = $1",
      [req.query.postId]
    );
    res.status(200).json(result.rows.map((like) => like.user_id));
  } catch (err) {
    console.error(err);
  }
});

app.post("/likes", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  let userId = -1;
  jwt.verify(token, "password", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");
    userId = userInfo.id;
  });

  try {
    const result = await pool.query(
      "INSERT INTO likes (photo_id, user_id) VALUES ($1, $2)",
      [req.body.postId, userId]
    );
    return res.status(200).json("Post liked");
  } catch (err) {
    console.error(err);
  }
});

app.delete("/likes", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  let userId = -1;
  jwt.verify(token, "password", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");
    userId = userInfo.id;
  });

  try {
    const result = await pool.query(
      "DELETE FROM likes WHERE user_id = $1 AND photo_id = $2",
      [userId, req.query.postId]
    );
    res.status(200).json("Post unliked");
  } catch (err) {
    console.error(err);
  }
});

app.get("/contribution", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, contribution FROM users ORDER BY contribution DESC LIMIT 10 "
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/searchComments", async (req, res) => {
  console.log(req.query.input);
  try {
    const result = await pool.query(
      `SELECT COUNT(users.user_id) as ocurr, fname, lname FROM users 
      JOIN comments as c 
      ON (users.user_id = c.user_id)
      WHERE c.commentText LIKE concat('%', $1::text, '%')
      GROUP BY users.user_id
      ORDER BY ocurr DESC`,
      [req.query.input]
    );
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/profilePosts", async (req, res) => {
  console.log(req.query.userId);
  try {
    const result = await pool.query(
      `SELECT p.*, username
      FROM photos AS p
      JOIN users AS u ON (u.user_id = p.user_id)
      WHERE p.user_id = $1
      ORDER BY p.postdate DESC`,
      [req.query.userId]
    );
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3005, () => {
  console.log("server is up and listening on port 3005");
});
