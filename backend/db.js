const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://m0hit04:Kx2so0MONGODB@cluster0.s1f7njv.mongodb.net/paytm');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 6,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 30,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', userSchema);

const accountSchema = new Schema({
    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,   // Reference to User Model
        ref: "User",
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = { 
    User,
    Account
};