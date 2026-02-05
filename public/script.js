// Grab DOM elements
const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const scoreText = document.getElementById("scoreText");
const scorePercent = document.getElementById("scorePercent");

let questions = [];

// Load questions from backend
async function loadQuestions() {
    const res = await fetch("/api/get_questions");
    questions = await res.json();

    quizContainer.innerHTML = questions.map((q, i) => {
        return `
            <div class="question-block">
                <p>${i + 1}. ${q.question}</p>
                <label><input type="radio" name="q${i}" value="${q.option1}"> ${q.option1}</label><br>
                <label><input type="radio" name="q${i}" value="${q.option2}"> ${q.option2}</label><br>
                <label><input type="radio" name="q${i}" value="${q.option3}"> ${q.option3}</label><br>
                <label><input type="radio" name="q${i}" value="${q.option4}"> ${q.option4}</label>
            </div>
        `;
    }).join('');
}

// Submit answers to backend
submitBtn.addEventListener("click", async () => {
    const userAnswers = {};
    questions.forEach((_, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        userAnswers[`q${i}`] = selected ? selected.value : "";
    });

    const res = await fetch("/api/check_answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers)
    });

    const result = await res.json();

    scoreText.innerText = `You got ${result.correct} out of ${result.total} correct!`;
    scorePercent.innerText = `Score: ${result.score}%`;
});

// Load quiz immediately if already fetched
loadQuestions();
