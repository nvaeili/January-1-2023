import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './adminpages/AdminDashboard/Dashboard';
import MainPage from './adminpages/AdminLogin/MainPage';
import { AuthContextProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Completed from './adminpages/AdminDashboard/Completed';
import MainPageRouter from './components/MainPageRouter';

// import Main from './adminpages/AdminDashboard/AdminComponents/main/Main';
// import Users from './adminpages/AdminDashboard/AdminComponents/users/Users';
// import Messages from './adminpages/AdminDashboard/AdminComponents/messages/Messages';
// import Rooms from './adminpages/AdminDashboard/AdminComponents/rooms/Rooms';
// import Requests from './adminpages/AdminDashboard/AdminComponents/requests/Requests';

function App() {
  return (
    <Router>
     <AuthContextProvider>
     <Routes>
      <Route path ='/dashboard/*' element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path ='/completed' element = {<ProtectedRoute><Completed/></ProtectedRoute>}/>
      <Route path ='/login' element = {<MainPage/>}/>
      {/*<Route path ='/Main' element = {<Main/>}/>
      <Route path ='/Users' element = {<Users/>}/>
      <Route path ='/Messages' element = {<Messages/>}/>
      <Route path ='/Requests' element = {<Requests/>}/>
      <Route path ='/Rooms' element = {<Rooms/>}/> */}
      <Route path ="*" element={<MainPageRouter/>}/>
     </Routes>
     </AuthContextProvider>
      
     
    </Router>
  );
}

export default App;
