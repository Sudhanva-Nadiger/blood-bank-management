const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
const Inventory = require('../models/inventoryModel');

// get all blood groups totalIn, totalOut from available inventory
router.get('/blood-groups-data', authMiddleware, async (req, res) => {

    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const bloodGroups = await Inventory.aggregate([
            {
                $match: {
                    organization
                }
            },
            {
                $group: {
                    _id: '$bloodGroup',
                    totalIn: { 
                        $sum:  {
                            $cond: [
                            {
                                $eq: ['$inventoryType', 'in']
                            }, '$quantity', 0]
                        }
                    },
                    totalOut: { 
                        $sum:  {
                            $cond: [{
                                $eq: ['$inventoryType', 'out']
                            }, '$quantity', 0]
                        }
                    },
                }
            }
        ]);
        return res.send({
            success: true,
            data: bloodGroups,
            message: 'Blood groups data fetched successfully'
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message 
        });
    }
});


module.exports = router;