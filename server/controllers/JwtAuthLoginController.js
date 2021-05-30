const user = require('../Models/User');
const pool = require('../database/connection');
const brypt = require("bcrypt");
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../Middleware/validinfo');

class JwtAuthLoginController {
    
    async access (req,res) {
        try {
            const {email, password} = req.body;
    
            const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    
            if (user.rows.length === 0 ){
                return res.status(401).json("Password or Email is incorrect");
            }
           
            const validPassword = brypt.compare(password, user.rows[0].user_password);
    
            if (!validPassword) {
                return res.status(401).json("Password or Email is incorrect");
            }
    
            const token = jwtGenerator(user.rows[0].user_id);
    
            res.json({token})
        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");            
        }

    }
}

module.exports = new JwtAuthLoginController();