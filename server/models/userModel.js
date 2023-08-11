const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ['donar', 'organization', 'hospital', 'admin']
    },
    name: {
        type: String,
        required : function () {
            return this.userType === 'admin' || this.userType === 'donar'
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            return this.userType === 'hospital'
        }
    },
    organizationName: {
        type: String,
        required: function () {
            return this.userType === 'organization'
        }
    },
    owner: {
        type: String,
        required: function () {
            return this.userType === 'organization' || this.userType === 'hospital'
        }
    },
    website: {
        type: String,
        required: function () {
            return this.userType === 'organization' || this.userType === 'hospital'
        }
    },
    address: {
        type: String,
        required: function () {
            return this.userType === 'organization' || this.userType === 'hospital'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type : String,
        required : true
    },
    phone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)