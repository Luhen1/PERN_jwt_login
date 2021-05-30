const express = require('express');
const app = express();
const cors = require("cors");



//middleware
app.use(cors());
app.use(express.json());


//routes
//Register/Login routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/home", require("./routes/Home"));


app.listen(5000, () => {
    console.log("server is running on port 5000");
});