import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin'; 
import LandingPage from './components/LandingPage';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import Userquiz  from './components/Userquiz';
import AddQuestionWithOption from './components/AddQuestionWithOption'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignin/>}></Route>
        <Route path="/user/signup" element={<UserSignup/>}></Route>
        <Route path="/user/signin" element={<UserSignin/>}></Route>
       <Route path="/user/quiz/:id" element={<Userquiz />} />
       <Route path='/admin/quiz' element={<AddQuestionWithOption/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
