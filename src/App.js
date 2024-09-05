// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Home from './Home';
import Auth from './Auth';
import CreateBusinessForm from './CreateBusinessForm';
import BusinessList from './BusinessList';
import BusinessDetail from  './BusinessDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Business App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-business">Create Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">Business List</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> {/* Add route for Home */}
          <Route path="/create-business" element={<CreateBusinessForm />} />
          <Route path="/list" element={<BusinessList />} />
          <Route path="/view-business/:id" element={<BusinessDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
