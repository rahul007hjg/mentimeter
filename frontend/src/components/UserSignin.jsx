import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserSignin() {
  const [form, setForm] = useState({ username: '', password: '', quizId: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, quizId } = form;
      const res = await axios.post('http://localhost:3000/user/signin', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token); // optional, if needed
      alert('Signed in successfully');

      // Redirect to quiz page using quizId entered by user
      navigate(`/user/quiz/${quizId}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Signin failed';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Signin</h2>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <input name="quizId" onChange={handleChange} placeholder="Quiz ID" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
