import React from 'react';

import Login from '../Auth/Login';

import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div>
      <main>
        <Login />
      </main>
      <div>
        <p>if you dont have an account <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
