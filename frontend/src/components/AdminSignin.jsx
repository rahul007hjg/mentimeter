import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminSignin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/admin/signin", form);
      localStorage.setItem("token", res.data.token); // Store token
      alert("Signed in successfully!");
      navigate("/admin/quiz"); // ✅ redirect to quiz creation page or dashboard
    } catch (err) {
      console.error("Signin failed:", err.response?.data || err.message);
      alert("Signin failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
