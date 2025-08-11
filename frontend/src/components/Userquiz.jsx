   import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Userquiz() {
  const { id } = useParams(); // gets quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch quiz data on load
  useEffect(() => {
    axios.get(`http://localhost:3000/user/quiz/${id}`)
      .then(res => setQuiz(res.data))
      .catch(err => {
        alert('Quiz not found');
        console.error(err);
      });
  }, [id]);

  // Handle selecting an answer
  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  // Submit quiz answers
  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selected]) => ({
      questionId: parseInt(questionId),
      selected,
    }));

    try {
      const res = await axios.post("http://localhost:3000/user/quiz/submit", {
        quizId: parseInt(id),
        answers: formattedAnswers,
      });

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit quiz");
      console.error(err);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div>
      <h2>Quiz: {quiz.title}</h2>
      {quiz.questions.map((q) => (
        <div key={q.id}>
          <p><strong>{q.question}</strong></p>
          {q.options.map((opt, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleSelect(q.id, opt)}
              />
              {opt}
            </label>
          ))}
          <hr />
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <div>
          <h3>Results</h3>
          <p>Score: {result.score} / {result.total}</p>
          <ul>
            {result.results.map(r => (
              <li key={r.questionId}>
                Q: {r.question} <br />
                Your Answer: {r.selected} <br />
                Correct: {r.correct ? "✅" : `❌ (${r.correctAnswers.join(', ')})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
