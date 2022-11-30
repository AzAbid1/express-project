const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
}

users = [];

function findUser(name) {
    if (this.users.find(user => user.getUsername() === name)) {
        return true;
    } else return false;
}

router.post('/signup', async function(req, res, next) {
    try {
        let {
            username,
            password
        } = req.body;
        if (!findUser(username)) {
            hashed_password = await bcrypt.hash(password,10);
            this.users.push(new User(username, hashed_password));
            console.log("User Created");
            res.send({
                status: 1,
                user: username,
                password: hashed_password
            });
        } else {
            console.log("User already exists.");
            res.send({
                status: 0,
                error: error
            });
        }
    } catch (error) {
        res.send({
            status: 0,
            error: error
        });
        console.log(error);
    }
});

router.post('/tokenSignin', async function(req, res, next) {
    try {
        let {
            username,
            password
        } = req.body;
        if (findUser(username)) {
            const userInList = this.users.find(user => user.getUsername() === username);
            const hashed_password =  await bcrypt.hash(password,10);
            if (bcrypt.compare(userInList.getPassword(), hashed_password)) {
                let token = jwt.sign({
                    data: username
                }, 'secret');
                res.send({
                    status: 1,
                    user: username,
                    password: hashed_password,
                    token: token
                });
            } else {
                console.log("Wrong password.");
                res.send({
                    status: 0,
                    error: error
                });
            }
        } else {
            console.log("User not found.");
            res.send({
                status: 0,
                error: error
            });
        }
    } catch (error) {
        res.send({
            status: 0,
            error: error
        });
    }
});

router.post('/signin', async function(req, res, next) {
    try {
        let {
            username,
            password
        } = req.body;
        if (findUser(username)) {
            const userInList = this.users.find(user => user.getUsername() === username);
            const hashed_password =  await bcrypt.hash(password,10);
            if (bcrypt.compare(userInList.getPassword(), hashed_password)) {
                res.send({
                    status: 1,
                    user: username,
                    password: hashed_password
                });
            } else {
                console.log("Wrong password.");
                res.send({
                    status: 0,
                    error: error
                });
            }
        } else {
            console.log("User not found.");
            res.send({
                status: 0,
                error: error
            });
        }
    } catch (error) {
        res.send({
            status: 0,
            error: error
        });
    }
});

router.get('/UsersList', async function(req, res, next) {
    try {
        console.log(this.users);
        res.send({
            status: 1
        });
    } catch (error) {
        res.send({
            status: 0,
            error: error
        });
    }
});

module.exports = router;