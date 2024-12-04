const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const PermissionRequest = mongoose.model("PermissionRequest", permissionRequestSchema);
module.exports = PermissionRequest;
