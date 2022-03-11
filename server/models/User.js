const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: false,
    },
    // stripe_customer_id and has_card to store stripe details for user
    stripe_customer_id: {
        type: String,
        required: false,
        default: null
    },
    has_card: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;