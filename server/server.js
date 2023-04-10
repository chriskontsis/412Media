const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// Enable CORS middleware
app.use(cors());
// Parse incoming JSON payloads
app.use(express.json());
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
        'SELECT * FROM users WHERE username = $1 AND pwd = $2',
        [username, password]
      );
      if (result.rowCount === 1) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  });


app.listen(3005, () => {
  console.log("server is up and listening on port 3005");
});
