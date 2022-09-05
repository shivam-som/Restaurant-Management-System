const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from router file server`);
});

// Asunc Await Solution
router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "Plz fill all the fields Properly !!"});
    }
    try {
        const userExist = await User.findOne({email: email});
        if (userExist) {
            return res.status(422).json({error: "Email already Exists !!"});
        } else if (password != cpassword) {
            return res.status(422).json({error: "Password & confirm Password not match !!"});
        } else {
            const user = new User({name, email, phone, work, password, cpassword});
            // How to hash password using bcryptjs, have to work pre save method, method pre is defined in userSchema file
            await user.save();
            res.status(201).json({message: "user registered successfully !!"});
        }
    } catch (err) {
        console.log(err);
    }
});

// Below solution is using Promises and we can also do it using async await
// router.post('/register', (req, res) => {
//     // res.send("mera register page"); // can use this aslo but using below line
//     // res.json({ message: req.body });

//     const {name, email, phone, work, password, cpassword} = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         // return res.json({error: "Plz fill all the fields Properly !!"});
//         return res.status(422).json({error: "Plz fill all the fields Properly !!"});
//     }
//     // checking that the user already exists or not
//     User.findOne({email: email}).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({error: "Email already Exists !!"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message: "user registered successfully !!"});
//         }).catch((err) => res.status(500).json({error: "Failed to register !!"}));
//     }).catch((err) => console.log(err));
// });

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email|| !password) {
            return res.status(422).json({error: "Plz fill all the fields Properly !!"});
        }
        const userLogin = await User.findOne({email: email});
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken(); //declared in userSchema file
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(400).json({error: "Invalid Credentials !!"});
            } else {
                return res.status(200).json({message: "User Successfully Loged in !!"});
            }
        } else {
            return res.status(400).json({error: "Invalid Credentials !!"});
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
