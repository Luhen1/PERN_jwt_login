class authController{

    async auth (req, res) {
        try{
            res.json(true); 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");            
        }
    }
}

module.exports = new authController();