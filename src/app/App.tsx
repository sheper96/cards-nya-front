import React from 'react';
import Login from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import Registration from '../features/Registration/Registration';
import logo from '../logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <Profile/>
            <Login/>
            <Registration/>
        </div>
    );
}

export default App;
