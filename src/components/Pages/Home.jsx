import React from 'react'
import Navbar from '../Sharedc/Navbar'
import Footer from '../Sharedc/Footer'
import LoginPage from './LoginPage'
function Home() {
  return (
    <div>
      
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