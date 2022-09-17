import React from 'react';
import Login from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import Registration from '../features/Registration/Registration';
import './App.css';
import Header from "../common/components/Header/Header";


function App() {
    return (
        <div className="App">
            <Header/>
            <Profile/>
            <Login/>
            <Registration/>
        </div>
    );
}

export default App;
