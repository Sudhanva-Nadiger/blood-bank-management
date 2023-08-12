const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');
const Inventory = require('../models/inventoryModel');
const mongoose = require('mongoose');

// register new user
router.post('/register', async (req, res) => {
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
        // check if user exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({ success: false, message: 'User does not exist' })
        }

        // check if user type is correct
        if(user.userType !== req.body.userType) {
            return res.send({ success: false, message: 'Invalid user type' })
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.send({ success: false, message: 'Invalid password' })
        }

        // create token
        const token = jwt.sign(
            {userId: user._id,}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        )

        return res.send({ success: true, message: 'Login successful', data: token })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

// get current user 
router.get('/get-current-user',authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId})
        user.password = undefined
        return res.send({
            success: true,
            message: 'User fetched successfully',
            data: user
        })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

// get all unique donars of organization
router.get('/get-all-donars', authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId)
        const uniqueDonarIds = await Inventory.aggregate([
            {
                $match: {
                    inventoryType: 'in',
                    organization
                },
            },
            {
                $group: {
                    _id: '$donar',
                }
            }
        ])

        const donars = await User.find({_id: {$in: uniqueDonarIds.map(donar => donar._id)}}, {
            name: 1,
            email: 1,
            phone: 1,
            createdAt: 1,
        })

        return res.send({
            success: true,
            message: 'Donars fetched successfully',
            data: donars
        })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

// get all unique hospitals of organization
router.get('/get-all-organizations-donar', authMiddleware, async (req, res) => {
    try {
        const donar = new mongoose.Types.ObjectId(req.body.userId)
        const uniqueOrganizationIds = await Inventory.distinct('organization', {
            donar
        })

        const organizations = await User.find({_id: {$in: uniqueOrganizationIds.map(organization => organization._id)}}, {
            organizationName: 1,
            email: 1,
            phone: 1,
            createdAt: 1,
            owner:1
        })

        return res.send({
            success: true,
            message: 'Hospitals fetched successfully',
            data: organizations
        })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

router.get('/get-all-organizations-hospital', authMiddleware, async (req, res) => {
    try {
        const hospital = new mongoose.Types.ObjectId(req.body.userId)
        const uniqueOrganizationIds = await Inventory.distinct('organization', {
            hospital
        })

        const organizations = await User.find({_id: {$in: uniqueOrganizationIds.map(organization => organization._id)}}, {
            organizationName: 1,
            email: 1,
            phone: 1,
            createdAt: 1,
            owner:1
        })


        return res.send({
            success: true,
            message: 'Hospitals fetched successfully',
            data: organizations
        })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

router.get('/get-all-hospitals', authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId)
        const uniqueHospitalIds = await Inventory.aggregate([
            {
                $match: {
                    inventoryType: 'out',
                    organization
                },
            },
            {
                $group: {
                    _id: '$hospital',
                }
            }
        ])

        const hospitals = await User.find({_id: {$in: uniqueHospitalIds.map(hospital => hospital._id)}}, {
            hospitalName: 1,
            email: 1,
            phone: 1,
            createdAt: 1,
            owner:1
        })

        return res.send({
            success: true,
            message: 'Hospitals fetched successfully',
            data: hospitals
        })
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
})

module.exports = router;