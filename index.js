var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', () => console.log("error in connecting to database"));
db.once('open', () => console.log("connected to database"));

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password
    };

    db.collection('users').insertOne(data, (error, collection) => {
        if (error) {
            throw error;
        }
        console.log("record inserted successfully");
    });

    return res.redirect('sign_up.html');
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
