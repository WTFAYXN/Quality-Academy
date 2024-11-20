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
            match: [/.+@.+\..+/, 'Please enter a valid email'], // Validates email format
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Ensures a minimum password length
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
