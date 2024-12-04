const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PermissionRequest = require('../models/PermissionRequest');
const {validateUser} = require('../user/auth');
const Resource = require('../models/Resource');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const resource = new Resource({
    title: req.file.originalname,
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });

  try {
    await resource.save();
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error saving resource:', error);
    res.status(500).send('Error saving resource');
  }
});

// Fetch resources endpoint
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Error fetching resources');
  }
});

// Delete resource endpoint
router.delete("/resources/:id", async (req, res) => {
  try {
    // console.log(`Received request to delete resource with ID: ${req.params.id}`);

    // Find the resource in MongoDB
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      console.error("Resource not found:", req.params.id);
      return res.status(404).json({ error: "Resource not found" });
    }

    // Extract the file name from imageUrl
    const fileName = path.basename(resource.imageUrl); // Extracts only "1732977017669-quiz proposal.pdf"
    const uploadsDir = path.join(__dirname, "../../uploads"); // Correct path to uploads directory in server folder
    const filePath = path.join(uploadsDir, fileName); // Combine uploads directory with the file name

    // console.log("Constructed file path:", filePath);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      // console.log("File deleted successfully from disk");
    } else {
      console.warn("File not found on disk:", filePath);
    }

    // Delete the resource from MongoDB
    await resource.deleteOne();
    // console.log("Resource deleted from MongoDB");

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error during deletion process:", error);
    res.status(500).json({ error: "Error deleting resource" });
  }
});

// Handle permission request
router.post("/request-permission", validateUser, async (req, res) => {
  try {
    const user = req.user;
    // Add logic to save the permission request to the database
    const permissionRequest = new PermissionRequest({
      user: user._id,
      name: user.name,
      email: user.email,
    });
    await permissionRequest.save();
    res.status(200).json({ message: "Permission request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;