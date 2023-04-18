const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "rootUser",
  database: "postgres",
});

module.exports = pool;
console.log("database connected!");
