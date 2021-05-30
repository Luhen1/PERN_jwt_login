const pool = require('../database/connection');
const bcrypt = require('bcrypt');

class User {
    async new (user_name, user_email, user_password){
        try {
            const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
            if (existingUser.rows.length !== 0 ){
                return {message:"usuario ja existe"};
            }
            
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            
            const bcryptPassword = await bcrypt.hash(user_password, salt);
            
            const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user_name, user_email, bcryptPassword]);
            
            return newUser;

        } catch (err) {
            console.error(err.message)
            return {message:"server error"};
        }
    }

}

module.exports = new User();