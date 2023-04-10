const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// Enable CORS middleware
app.use(cors());
// Parse incoming JSON payloads
app.use(express.json());
const contribution = 0;
let user_id = 1;
// Route for user registration
app.post("/register", async (req, res) => {
  try {
    // Destructure user data from the request body
    user_id++;
    const id = user_id;
    const { username, password, fname, lname, email, hometown, gender, dob } =
      req.body;
    const contrib = 0;
    // Insert new user data into the users table
    const newUser = await pool.query(
      "INSERT INTO users (user_id, username, pwd, fname, lname, email, hometown, gender, dob, contribution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        user_id,
        username,
        password,
        fname,
        lname,
        email,
        hometown,
        gender,
        dob,
        contribution,
      ]
    );

    res.json(newUser.rows[0]);
    console.log("post");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3005, () => {
  console.log("server is up and listening on port 3005");
});
