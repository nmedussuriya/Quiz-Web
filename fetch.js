const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { questionsCache } = require("../cache"); // import shared memory

// Fetch questions from OpenTDB
router.get("/fetch_questions", async (req, res) => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();

    // Store in memory
    questionsCache.length = 0; // clear previous
    data.results.forEach(q => {
      const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
      questionsCache.push({
        question: q.question,
        correct_answer: q.correct_answer,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3]
      });
    });

    res.json({ message: "Questions fetched and stored in memory!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get questions for frontend
router.get("/get_questions", (req, res) => {
  res.json(questionsCache);
});

module.exports = router;
