const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Routes
const fetchRoutes = require("./routes/fetch");
const quizRoutes = require("./routes/quiz");

app.use(express.json());
app.use(express.static("public")); // serve frontend files

// Mount backend routes
app.use("/api", fetchRoutes); 
app.use("/api", quizRoutes);  

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
