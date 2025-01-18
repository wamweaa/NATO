import React from 'react';
import Navbar from '../Sharedc/Navbar';
import Register from '../Auth/Register';
import Footer from '../Sharedc/Footer';

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Register />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
