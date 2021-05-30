const express = require('express')
const router = express.Router();

//Middleware
const validInfo = require('../Middleware/validinfo');
const authorization = require('../Middleware/authorization');

//controllers
const registerController = require('../controllers/JwtAuthRegisterController');
const loginController = require('../controllers/JwtAuthLoginController');
const authController = require('../controllers/authController');
//POST
router.post("/register", validInfo, registerController.create);
router.post("/login", validInfo, loginController.access);

//GET
router.get("/verify", authorization, authController.auth); 

module.exports = router;