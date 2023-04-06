import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Post from './components/Post/Post';
import PostCreate from './components/Post/PostCreate';
import Auth from './components/Auth/Auth';
import Login from './components/Auth/Login';
import User from './components/User/User';
import MainHome from './components/Home/MainHome';
import ChatRoom from './chat/ChatRoom';
import Chat from './chat/Chat';
import React from 'react';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/postcreate" element={<PostCreate/>}/>
        <Route path="/" element={<MainHome/>}/>
        <Route path="/posts" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/users" element={<User/>}/>
        <Route path="/chat" element={<ChatRoom/>}/>
        <Route path="/demo" element={<Chat/>}/>
        <Route path="/register" element={<Auth/>}/>
        <Route   path="/auth"
         element= {localStorage.getItem("userId") !=null ? <Navigate  to="/home"/> :<Auth/> }
      ></Route>
        

       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
