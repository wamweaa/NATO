import React from 'react';
import Navbar from '../Sharedc/Navbar';
import Footer from '../Sharedc/Footer';


const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="home-container">
        <h1>Welcome to the Dashboard Application</h1>
        <p>Navigate through the application using the menu above.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
