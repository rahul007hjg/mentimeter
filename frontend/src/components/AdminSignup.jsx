import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminSignup() {
  const [form, setForm] = useState({ username: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/signup", form);
      alert("Signup successful!");
      navigate("/admin/signin");
    } catch (err) {
      alert("Signup failed!");
      console.error(err);
    }
  };

  return (
    <>
      {/* Inline styles for the page */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #74ebd5, #acb6e5);
          min-height: 100vh;
          display:flex;
          justify-content:center
          padding:20px
        }
        .signup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }
        .signup-form {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 400px;
        }
        .signup-form h2 {
          text-align: center;
          color: #6a0dad;
          margin-bottom: 20px;
        }
        .input {
          padding: 12px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .input:focus {
          border-color: #6a0dad;
        }
        .submit-btn {
          padding: 12px;
          background-color: #6a0dad;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #4b0082;
        }
      `}</style>

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Admin Signup</h2>

          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="input"
          />
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="input"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </>
  );
}
