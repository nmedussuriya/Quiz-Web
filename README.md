#Simple Quiz Web App
Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express

API: Open Trivia Database (OpenTDB)

Overview

This is a simple web application that allows users to attempt multiple-choice quizzes.

Questions are fetched from the OpenTDB API but are stored in server memory (cached) to prevent repeated API calls and avoid rate limits.

Users can select answers for each question and navigate through the quiz.

At the end, the app calculates the score and displays the number of correct answers and percentage.

The backend ensures that the quiz is consistent and prevents wrong scoring due to HTML encoding issues.

Instructions to Run Locally

Clone the repository:

git clone <your-repo-url>
cd quiz-node


Install dependencies:

npm install


Start the server:

node server.js


Open your browser and go to:

http://localhost:3000
