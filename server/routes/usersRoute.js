const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// register new user
router.post('/register', async (req, res) => {
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email })
        if(userExists) {
            return res.send({success: false, message: 'User already exists'})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // create new user
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        return res.send({success: true, message: 'User created successfully', data: savedUser})
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})