const express = require('express'); // Import Express
const app = express();             // Create an Express application
const cors = require('cors');       // Import CORS
const userRouter = require('./src/routes/userRoutes'); // Import the router
const uploadRouter = require('./src/routes/uploads'); // Import the router
const quizRouter = require('./src/routes/quiz'); // Import the router
const adminRouter = require('./src/routes/admin'); // Import the router
const path = require('path');
const fs = require('fs');
const port = 5000;                 // Define the port
const connectDB = require('./src/db'); // Import the connectDB function

connectDB();
// Middleware to parse JSON data
app.use(express.json());

app.use(cors());

// Use router for all routes
app.use("/", userRouter);
app.use("/", uploadRouter);
app.use("/", quizRouter);
app.use("/", adminRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
