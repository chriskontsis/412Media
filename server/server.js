const express = require("express");
const app = express();


app.get("/getMedia", (req, res) => {
    res.send("these are the restaurants");
})








app.listen(3005, () => {
    console.log("server is up and listening on port 3005")
});