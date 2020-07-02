const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');

const User = require('./../models/user');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome to user controller");
})

app.post('/resp/add', (req, res) => {

    let data = req.body;

    let user = new User({
        email: data.email,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
        role: "resp"
    });

    user.save()
        .then(() => { res.status(200).send("resp added"); })
        .catch((e) => { res.status(400).send(e); })

})

app.post('/com/add', (req, res) => {

    let data = req.body;

    let user = new User({
        email: data.email,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
        role: "com"
    });

    user.save()
        .then(() => { res.status(200).send("com added"); })
        .catch((e) => { res.status(400).send(e); })
})

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email }).
        then((user) => {
            if (!user) {
                res.status(404).send("Email Incorrect");
            } else {

                let compare = bcrypt.compareSync(password, user.password);

                if (!compare) {
                    res.status(404).send("Password Incorrect");
                } else {

                    let token = jwt.sign({ id: user._id, role: user.role }, "SEKRITOU");

                    res.status(200).send({ token });

                }
            }
        })
        .catch((e) => { res.status(400).send(e); })

})

module.exports = app;