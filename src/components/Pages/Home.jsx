import React from 'react'
import Navbar from '../Sharedc/Navbar'
import Footer from '../Sharedc/Footer'
import LoginPage from './LoginPage'
function Home() {
  return (
    <div>
      <h1><strong>Loggin to view your account details</strong></h1>
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='login-page'>
        <LoginPage/>
        </div>
        <div className='footer'>
          <Footer/>
        </div>

    </div>
  )
}

export default Home