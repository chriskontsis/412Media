const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
      "INSERT INTO users (user_id, username, pwd, fname, lname, email, hometown, gender, dob, contribution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        id,
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
      "SELECT p.*,  u.user_id AS userId, fname FROM Photos as p JOIN users AS u ON (p.user_id = u.user_id) LEFT JOIN friends AS f ON (p.user_id = f.friend_id) WHERE f.user_id = $1 OR p.user_id = $2",
      [id, id]
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.listen(3005, () => {
  console.log("server is up and listening on port 3005");
});
