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
app.post("/register",async(req,res)=>{
    try {
         // Destructure user data from the request body
        const { user_id, password, fName, lName, email, hometown, gender, dob } = req.body;
         // Insert new user data into the users table
        const newUser = await pool.query(
            "INSERT INTO users (user_id, password, fName, lName, email, hometown, gender, dob, contribution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [user_id, password, fName, lName, email, hometown, gender, dob, contribution]
          );
    
          res.json(newUser.rows[0]);
        } catch (err) {
          console.error(err.message);
        }
});

app.get("/getMedia", (req, res) => {
    res.send("these are the restaurants");
})








app.listen(3005, () => {
    console.log("server is up and listening on port 3005")
});