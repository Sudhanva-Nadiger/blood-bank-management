const router = require('express').Router();
const Inventory = require('../models/inventoryModel');
const User = require('../models/userModel');
const authMiddleWare = require('../middlewares/authMiddleware');

// @desc    Add new inventory
// @route   POST /api/inventory/add
// @access  Private
router.post('/add', authMiddleWare, async (req, res) => {
    try {
        // validate email and inventoryType
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            throw new Error('Invalid Email');
        }

        console.log("log from add inventory", user);

        const invType = req.body.inventoryType
        if(invType === 'in' && user.userType !== 'donar') {
            throw new Error('This email not registered as donor');
        }

        if(invType === 'out' && user.userType !== 'hospital') {
            throw new Error('This email not registered as hospital');
        }

        if(invType === 'out') {
            req.body.hospital = user._id;
        } else {
            req.body.donor = user._id;
        }

        const inventory = new Inventory(req.body);

        const savedInventory = await inventory.save();

        res.send({
            success: true,
            message: 'Inventory added successfully',
            data: savedInventory
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
