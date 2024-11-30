const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
router.delete('/resources/:id', async (req, res) => {
  try {
    console.log(`Deleting resource with ID: ${req.params.id}`);
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      console.error('Resource not found:', req.params.id);
      return res.status(404).send('Resource not found');
    }

    // Extract the filename from the imageUrl
    const filename = path.basename(resource.imageUrl);
    const filePath = path.resolve(__dirname, '..', 'uploads', filename);

    console.log(`Deleting file: ${filePath}`);

    // Check if the file exists before attempting to delete it
    if (fs.existsSync(filePath)) {
      // Delete the file from the uploads directory
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).send('Error deleting file');
        }

        // Delete the resource from the MongoDB database
        try {
          await Resource.findByIdAndDelete(req.params.id);
          res.status(200).send('Resource deleted successfully');
        } catch (error) {
          console.error('Error deleting resource from database:', error);
          res.status(500).send('Error deleting resource from database');
        }
      });
    } else {
      console.error('File not found:', filePath);
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).send('Error deleting resource');
  }
});

module.exports = router;