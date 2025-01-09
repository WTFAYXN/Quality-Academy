const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PermissionRequest = require('../models/PermissionRequest');
const { validateUser, validateAdmin } = require('../user/auth');
const Resource = require('../models/Resource');
const url = process.env.BACKEND_URL || 'http://localhost:5000';
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

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 10MB limit
});

// Upload endpoint
router.post('/upload', validateUser, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const { title, category } = req.body;

  const resource = new Resource({
    title,
    imageUrl: `${url}/uploads/${req.file.filename}`,
    status: 'pending',
    uploadedBy: req.user._id,
    category,
  });

  try {
    await resource.save();
    res.status(200).send('File uploaded successfully and pending for review');
  } catch (error) {
    console.error('Error saving resource:', error);
    res.status(500).send('Error saving resource');
  }
});

// Fetch pending resources for admin review
router.get('/pending-resources', validateAdmin, async (req, res) => {
  try {
    const resources = await Resource.find({ status: 'pending' }).populate('uploadedBy', 'name email');
    res.json(resources);
  } catch (error) {
    console.error('Error fetching pending resources:', error);
    res.status(500).send('Error fetching pending resources');
  }
});

// Publish resource
router.post('/publish-resource/:id', validateAdmin, async (req, res) => {
  const { title, category } = req.body;
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).send('Resource not found');
    }
    if (title) {
      resource.title = title;
    }
    if (category) {
      resource.category = category;
    }
    resource.status = 'published';
    await resource.save();
    res.status(200).send('Resource published successfully');
  } catch (error) {
    console.error('Error publishing resource:', error);
    res.status(500).send('Error publishing resource');
  }
});

// Reject resource
router.post('/reject-resource/:id', validateAdmin, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).send('Resource not found');
    }

    // Extract the file name from imageUrl
    const fileName = path.basename(resource.imageUrl);
    const uploadsDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadsDir, fileName);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully from disk');
    } else {
      console.warn('File not found on disk:', filePath);
    }

    // Delete the resource from MongoDB
    await resource.deleteOne();
    console.log('Resource deleted from MongoDB');

    res.status(200).send('Resource rejected and deleted successfully');
  } catch (error) {
    console.error('Error rejecting resource:', error);
    res.status(500).send('Error rejecting resource');
  }
});

// Fetch all published resources
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find({ status: 'published' }).populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Error fetching resources');
  }
});

// Delete resource
router.delete("/resources/:id", async (req, res) => {
  try {
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

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted successfully from disk");
    } else {
      console.warn("File not found on disk:", filePath);
    }

    // Delete the resource from MongoDB
    await resource.deleteOne();
    console.log("Resource deleted from MongoDB");

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error during deletion process:", error);
    res.status(500).json({ error: "Error deleting resource" });
  }
});

module.exports = router;