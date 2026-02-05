const express = require("express");
const router = express.Router();
const { questionsCache } = require("../cache");
const he = require("he");

router.post("/check_answers", (req, res) => {
  const userAnswers = req.body;

  if (!questionsCache.length) {
    return res.status(400).json({ error: "No questions available" });
  }

  let correctCount = 0;

  questionsCache.forEach((q, index) => {
    const submitted = he
      .decode(userAnswers[`q${index}`] || "")
      .trim()
      .toLowerCase();

    const correct = he
      .decode(q.correct_answer)
      .trim()
      .toLowerCase();

    if (submitted === correct) correctCount++;
  });

  res.json({
    total: questionsCache.length,
    correct: correctCount,
    score: Math.round((correctCount / questionsCache.length) * 100),
  });
});

module.exports = router;
