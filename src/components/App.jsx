import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import UserDashboardPage from './Pages/UserDashboardPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import UserProfilePage from './Pages/UserProfilePage'
import UserManagement from './Dashboard/UserManagement';
import FinancialRecords from './Dashboard/FinancialRecords';
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
          <Route path='/Financialrecords' element={<FinancialRecords/>}/>
          <Route path='/usermanagement' element={<UserManagement/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App