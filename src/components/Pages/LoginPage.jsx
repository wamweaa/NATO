import React from 'react';
import Navbar from '../Sharedc/Navbar';
import Login from '../Auth/Login';
import Footer from '../Sharedc/Footer';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
