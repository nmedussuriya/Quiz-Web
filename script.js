let questionsData = []; // store questions on client side

async function loadQuiz() {
  // Fetch questions only once
  const fetchRes = await fetch("/api/fetch_questions");
  await fetchRes.json(); // just to ensure memory on server is ready

  const res = await fetch("/api/get_questions");
  questionsData = await res.json();

  let html = "";
  questionsData.forEach((q, index) => {
    html += `<p><b>${index + 1}. ${q.question}</b></p>`;
    html += `<label><input type="radio" name="q${index}" value="${q.option1}"> ${q.option1}</label><br>`;
    html += `<label><input type="radio" name="q${index}" value="${q.option2}"> ${q.option2}</label><br>`;
    html += `<label><input type="radio" name="q${index}" value="${q.option3}"> ${q.option3}</label><br>`;
    html += `<label><input type="radio" name="q${index}" value="${q.option4}"> ${q.option4}</label><br><br>`;
  });

  document.getElementById("quiz").innerHTML = html;
}

// Submit answers
document.getElementById("quizForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const answers = {};
  for (let [key, value] of formData.entries()) answers[key] = value;

  const res = await fetch("/api/check_answers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers)
  });

  const result = await res.json();
  document.getElementById("result").innerHTML = `<h2>You got ${result.correct} / ${result.total} correct (${result.score}%)</h2>`;
});
