const router = require('express').Router();
const Inventory = require('../models/inventoryModel');
const User = require('../models/userModel');
const authMiddleWare = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// @desc    Add new inventory
// @route   POST /api/inventory/add
// @access  Private
router.post('/add', authMiddleWare, async (req, res) => {
    try {
        // validate email and inventoryType
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('Invalid Email');
        }

        const invType = req.body.inventoryType
        if (invType === 'in' && user.userType !== 'donar') {
            throw new Error('This email not registered as donar');
        }

        if (invType === 'out' && user.userType !== 'hospital') {
            throw new Error('This email not registered as hospital');
        }

        if (invType === 'out') {
            // check if inventory is available
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);

            const totalInOfRequestedBloodGroup = await Inventory.aggregate([
                {
                    $match: {
                        bloodGroup: requestedBloodGroup,
                        inventoryType: 'in',
                        organization: organization
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: {
                            $sum: '$quantity'
                        }
                    }
                }
            ]);

            const totalIn = totalInOfRequestedBloodGroup.length > 0 ? totalInOfRequestedBloodGroup[0].total : 0;

            const totalOutOfRequestedBloodGroup = await Inventory.aggregate([
                {
                    $match: {
                        bloodGroup: requestedBloodGroup,
                        inventoryType: 'out',
                        organization: organization
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: {
                            $sum: '$quantity'
                        }
                    }
                }
            ]);

            const totalOut = totalOutOfRequestedBloodGroup.length > 0 ? totalOutOfRequestedBloodGroup[0].total : 0;
            const availableQuantity = totalIn - totalOut;

            if (availableQuantity < requestedQuantity) {
                throw new Error(`only ${availableQuantity} unit(s) of ${requestedBloodGroup.toUpperCase()} blood available`);
            }

            req.body.hospital = user._id;
        } else {
            req.body.donar = user._id;
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

// get inventory
router.get('/get', authMiddleWare, async (req, res) => {
    try {
        const inventory = await Inventory.find({ organization: req.body.userId }).populate('donar').populate('hospital', 'hospitalName').sort({ createdAt: -1 });
        return res.send({
            success: true,
            message: 'Inventory fetched successfully',
            data: inventory
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})
router.get('/filter', authMiddleWare, async (req, res) => {
    try {
        const inventory = await Inventory.find({ hospital: req.body.userId, inventoryType: 'out' }).populate('organization', 'organizationName')
        console.log("hospital inventory******", inventory);

        res.send({
            success: true,
            message: 'Inventory fetched successfully',
            data: inventory
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})

module.exports = router;
