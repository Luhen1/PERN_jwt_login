const User = require('../Models/User');
const jwtGenerator = require('../utils/jwtGenerator');

class JwtAuthRegisterController {
    
    async create (req,res) {
        
        var {name, email, password} = req.body;

        if ( name == undefined || email == undefined || password == undefined){
            return res.status(400).json({error: "preencha os camps correntamente"})
        }

        var user = await User.new(name, email, password)
        const token = jwtGenerator(user);    
        
        return res.status(200).json({token});
        

    }
}

module.exports = new JwtAuthRegisterController();