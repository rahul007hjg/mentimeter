import React, { useState } from 'react';
import axios from 'axios';

function AddQuestionWithOption() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""],
      correct: []
    },
  ]);
  const [createdQuizId, setCreatedQuizId] = useState(null);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const toggleCorrect = (qIdx, opt) => {
    const updated = [...questions];
    const correctList = updated[qIdx].correct;
    if (correctList.includes(opt)) {
      updated[qIdx].correct = correctList.filter(o => o !== opt);
    } else {
      updated[qIdx].correct.push(opt);
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""], correct: [] }]);
  };

  const handleSubmit = async () => {
    try {
      const quizRes = await axios.post("http://localhost:3000/admin/quiz", {
        title: quizTitle,
      }, {
        headers: { token },
      });

      const quizid = quizRes.data.quiz.id;
      setCreatedQuizId(quizid);

      for (const q of questions) {
        const qRes = await axios.post("http://localhost:3000/admin/questions", {
          quizid,
          question: q.question,
        });

        const questionId = qRes.data.quest.id;

        await axios.post(`http://localhost:3000/admin/question/option/${q.options.length}`, {
          questionId,
          options: q.options,
          correct: q.correct,
        });
      }

      alert("Quiz created successfully");
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz");
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #d9a7c7, #fffcdc);
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 900px;
          margin: auto;
          padding: 40px 20px;
        }
        .heading {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          color: #4a148c;
          margin-bottom: 20px;
        }
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }
        .input:focus {
          outline: none;
          border-color: #8e24aa;
          box-shadow: 0 0 5px #ba68c8;
        }
        .question-box {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 25px;
        }
        .option-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .add-btn,
        .submit-btn,
        .question-btn {
          background-color: #8e24aa;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .add-btn:hover,
        .submit-btn:hover,
        .question-btn:hover {
          background-color: #6a1b9a;
        }
        .success-msg {
          background-color: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
          padding: 15px;
          border-radius: 8px;
          margin-top: 30px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>

      <div className="container">
        <h2 className="heading">🎯 Create a New Quiz</h2>

        <input
          className="input"
          placeholder="Enter Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        {questions.map((q, qIdx) => (
          <div key={qIdx} className="question-box">
            <input
              className="input"
              placeholder={`Question ${qIdx + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIdx, e.target.value)}
            />

            {q.options.map((opt, optIdx) => (
              <div key={optIdx} className="option-line">
                <input
                  className="input"
                  placeholder={`Option ${optIdx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={q.correct.includes(opt)}
                    onChange={() => toggleCorrect(qIdx, opt)}
                  />
                  Correct
                </label>
              </div>
            ))}

            <button className="add-btn" onClick={() => addOption(qIdx)}>+ Add Option</button>
          </div>
        ))}

        <div style={{ marginBottom: "20px" }}>
          <button className="question-btn" onClick={addQuestion}>+ Add Question</button>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>🚀 Submit Quiz</button>

        {createdQuizId && (
          <div className="success-msg">
            ✅ Quiz created successfully with ID: <strong>{createdQuizId}</strong>
          </div>
        )}
      </div>
    </>
  );
}

export default AddQuestionWithOption;
