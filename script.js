// script.js
let questionCount = 0;

function addQuestion() {
    questionCount++;
    const container = document.getElementById('questionsContainer');

    const questionHTML = `
    <div class="question-block">
      <h3>Question ${questionCount}</h3>
      <input type="text" placeholder="Enter your question" name="question${questionCount}" required />
      <div class="options">
        <input type="text" placeholder="Option A" name="q${questionCount}optA" required />
        <input type="text" placeholder="Option B" name="q${questionCount}optB" required />
        <input type="text" placeholder="Option C" name="q${questionCount}optC" required />
        <input type="text" placeholder="Option D" name="q${questionCount}optD" required />
      </div>
      <input type="text" placeholder="Correct Answer (A/B/C/D)" name="q${questionCount}ans" required />
    </div>
  `;
    container.insertAdjacentHTML('beforeend', questionHTML);
}

document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const quizTitle = form.quizTitle.value;
    const quizData = { title: quizTitle, questions: [] };

    for (let i = 1; i <= questionCount; i++) {
        const q = form[`question${i}`].value;
        const optA = form[`q${i}optA`].value;
        const optB = form[`q${i}optB`].value;
        const optC = form[`q${i}optC`].value;
        const optD = form[`q${i}optD`].value;
        const correct = form[`q${i}ans`].value.toUpperCase();

        quizData.questions.push({
            question: q,
            options: { A: optA, B: optB, C: optC, D: optD },
            answer: correct,
        });
    }

    localStorage.setItem('customQuiz', JSON.stringify(quizData));
    alert("✅ Quiz Saved! Now go to 'Take Quiz'");
    form.reset();
    document.getElementById('questionsContainer').innerHTML = '';
    questionCount = 0;
});
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer("None"); // mark unanswered
        }
    }, 1000);
}
