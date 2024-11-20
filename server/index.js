const express = require('express'); // Import Express
const app = express();             // Create an Express application
const port = 5000;                 // Define the port

// Middleware to parse JSON data
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
