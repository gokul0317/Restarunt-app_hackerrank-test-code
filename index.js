var express = require("express");
var bodyParser = require("body-parser");

var db = require("./configs/db.js");

db.authenticate()
    .then(() => console.log("connected"))
    .catch(err => console.log("_ERR_: " + err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var PORT = process.env.PORT || 5000;

app.use('/restaurants', require("./routes/restaurant"));

app.use("/", (req, res) => {
    res.json({"messages": "Invalid URL", "type" : "error"})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
