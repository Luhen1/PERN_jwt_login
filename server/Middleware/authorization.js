const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

        const Token = req.header("token");

        if (!Token) {
            return res.status(403).json({msg: "authorization denied"});
        }

    try {
        const verify = jwt.verify(Token, process.env.jwtSecret);

        req.user = verify.user;

        next();
    } catch (error) {
        res.status(401).json({msg: "Token is not valid"});
    }
}