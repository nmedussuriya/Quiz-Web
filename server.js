const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Routes
const fetchRoutes = require("./routes/fetch");
const quizRoutes = require("./routes/quiz");

// Middleware
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route root '/' to your quiz.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

// Mount backend routes
app.use("/api", fetchRoutes); 
app.use("/api", quizRoutes);  

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
