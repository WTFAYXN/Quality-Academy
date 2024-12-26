const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'published'],
    default: 'pending',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
},{ timestamps: true }
);

module.exports = mongoose.model('Resource', ResourceSchema);