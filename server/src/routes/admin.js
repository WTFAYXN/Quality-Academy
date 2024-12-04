const express = require("express");
const router = express.Router();
const PermissionRequest = require("../models/PermissionRequest");
const User = require("../models/userModel");
const {validateAdmin} = require("../user/auth");
const mongoose = require("mongoose");

// Fetch all permission requests
router.get("/permission-requests", validateAdmin, async (req, res) => {
  try {
    const requests = await PermissionRequest.find()
      .populate("user", "name email _id")
      .sort({ requestedAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a permission request
router.post("/approve-permission/:userId", validateAdmin, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(req.params.userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    user.canUpload = true;
    await user.save({ session });

    await PermissionRequest.deleteOne({ user: req.params.userId }, { session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Permission granted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
