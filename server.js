const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Backend routes
try {
    const fetchRoutes = require("./routes/fetch");
    const quizRoutes = require("./routes/quiz");

    app.use("/api", fetchRoutes); 
    app.use("/api", quizRoutes);  
} catch (err) {
    console.error("Error loading backend routes:", err);
}

// Route root '/' to your quiz.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
