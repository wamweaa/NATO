import React from 'react';
import Navbar from '../Sharedc/Navbar';
import UserProfile from '../Profile/UserProfile';
import Footer from '../Sharedc/Footer';

const UserProfilePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
