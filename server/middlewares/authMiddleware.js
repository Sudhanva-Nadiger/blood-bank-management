const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // get token from header
    const token = req.header('authorization')
    if (!token) {
        return res.send({ success: false, message: 'Access denied' })
    }

    try {
        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = verified.userId
        next()
    } catch (error) {
        return res.send({ success: false, message: 'Invalid token' })
    }
}