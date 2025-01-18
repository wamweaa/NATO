import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import UserDashboardPage from './Pages/UserDashboardPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import UserProfilePage from './Pages/UserProfilePage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/user/dashboard' element={<UserDashboardPage/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboardPage/>}/>
          <Route path='/profile' element={<UserProfilePage/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App