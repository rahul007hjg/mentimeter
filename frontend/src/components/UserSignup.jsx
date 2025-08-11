 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserSignup() {
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/signup', form);
      alert('Signup successful!');
      navigate('/user/signin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Signup</h2>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
