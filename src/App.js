import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import DashboardT from './pages/DashboardT';
import About from './pages/About';


function App() {
  const [isAuthenticated, setIsAuthenticated] =  useState(false);

  const PrivateRoute = ({ element, allowedRole }) => {
    const role = localStorage.getItem('role');

    if (!isAuthenticated) {
      return <Navigate to='/home' />;
    }

    if (allowedRole && role !== allowedRole) {
      return <Navigate to='/home' />;
    }

    return element;
  };

  return (
    <div className="App">
      < RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element = {<Navigate to = '/home' />}/>
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/home' element = {<Home />} />
        <Route path = '/about' element = {<About />} />
        <Route path='/dashboard' element = {< PrivateRoute element = {<Dashboard />} allowedRole = "student" />} />
        <Route path='/dashboardt' element = {< PrivateRoute element = {<DashboardT />} allowedRole = "teacher" />} />
      </Routes>
    </div>
  );
}
  
export default App;