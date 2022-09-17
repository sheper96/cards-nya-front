import React from 'react';
import Login from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import Registration from '../features/Registration/Registration';
import './App.css';
import Header from "../common/components/Header/Header";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>
                <Route path={'/login'} element={  <Login/>}></Route>
                <Route path={'/'} element={      <Profile/>}></Route>
                <Route path={'/registration'} element={      <Registration/>}></Route>



            </Routes>
        </div>
    );
}

export default App;
