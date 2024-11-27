const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate emails
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Ensures a minimum password length
        },
        profession: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0, // 0 for user, 1 for admin
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
