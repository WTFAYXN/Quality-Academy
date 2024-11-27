const express = require('express'); // Import Express
const app = express();             // Create an Express application
const cors = require('cors');       // Import CORS
const router = require('./src/routes/userRoutes'); // Import the router
const port = 5000;                 // Define the port
const connectDB = require('./src/db'); // Import the connectDB function

connectDB();
// Middleware to parse JSON data
app.use(express.json());

app.use(cors());

// Use router for all routes
app.use("/", router);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
