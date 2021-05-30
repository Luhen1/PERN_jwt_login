const router = require("express").Router();
const authorization = require("../Middleware/authorization");
const pool = require('../database/connection');

router.get("/dashboard", authorization, async (req, res) => {
  try {
    // gets the user name from the database
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router