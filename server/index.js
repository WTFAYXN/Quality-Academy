const express = require('express'); // Import Express
const app = express();             // Create an Express application
const cors = require('cors');       // Import CORS
const userRouter = require('./src/routes/userRoutes'); // Import the router
const uploadRouter = require('./src/routes/uploads'); // Import the router
const quizRouter = require('./src/routes/quiz'); // Import the router
const adminRouter = require('./src/routes/admin'); // Import the router
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;               // Define the port
const connectDB = require('./src/db'); // Import the connectDB function
const { SitemapStream, streamToPromise } = require("sitemap");

connectDB();
// Middleware to parse JSON data
app.use(express.json());

app.use(cors());

// Use router for all routes
app.use("/", userRouter);
app.use("/", uploadRouter);
app.use("/", quizRouter);
app.use("/", adminRouter);

app.get("/sitemap.xml", async (req, res) => {
    try {
        const links = [
            { url: "/", changefreq: "daily", priority: 1.0 },
            { url: "/contact", changefreq: "monthly", priority: 0.6 },
            { url: "/login", changefreq: "monthly", priority: 0.6 },
            { url: "/resources", changefreq: "monthly", priority: 0.6 },
            { url: "/signup", changefreq: "monthly", priority: 0.6 },
            { url: "/terms", changefreq: "monthly", priority: 0.6 },
            { url: "/privacy", changefreq: "monthly", priority: 0.6 },
            { url: "/user", changefreq: "monthly", priority: 0.6 },
            { url: "/admin/requests", changefreq: "monthly", priority: 0.6 },
            { url: "/forgot-password", changefreq: "monthly", priority: 0.6 },
            { url: "/reset-password/:id/:token", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/upload", changefreq: "monthly", priority: 0.6 },
            { url: "/quiz/:id", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/attempted", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/created", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/create", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/:id", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/:id/responses", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/:id/responses/:responseId", changefreq: "monthly", priority: 0.6 },
            { url: "/quizzes/:quizId/already-submitted", changefreq: "monthly", priority: 0.6 },
        ];

        const sitemap = new SitemapStream({ hostname: "https://qualityacademy.info" });
        res.header("Content-Type", "application/xml");
        streamToPromise(sitemap).then((data) => res.send(data.toString()));
        links.forEach((link) => sitemap.write(link));
        sitemap.end();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating sitemap");
    }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Backend!');
});

app.use((req, res, next) => {
    res.setTimeout(300000, () => {
        console.log('Request has timed out.');
        res.status(408).send('Request has timed out.');
    });
    next();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
