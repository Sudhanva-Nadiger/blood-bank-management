const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// register new user
router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.send({ success: false, message: 'User already exists' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // create new user
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        return res.send({ success: true, message: 'User created successfully', data: savedUser })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

// login user
router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        // check if user exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({ success: false, message: 'User does not exist' })
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.send({ success: false, message: 'Invalid password' })
        }

        // create token
        const token = jwt.sign(
            {userid: user._id,}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        )

        return res.send({ success: true, message: 'Login successful', data: token })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

module.exports = router;