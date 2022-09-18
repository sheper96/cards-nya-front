import React from 'react';
import Login from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import Registration from '../features/Registration/Registration';
import s from './App.module.css'
import Header from "../common/components/Header/Header";
import {Route, Routes} from "react-router-dom";
import {createTheme} from '@mui/material/styles'
import {ThemeProvider} from "@mui/material";
import {Snackbars} from "../common/snackbars/Snackbars";

export const font = "'Montserrat', sans-serif";
const theme = createTheme({
    typography: {
        fontFamily: font,
    },
    palette: {
        primary: {
            main: '#366EFF',
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <Header/>
                <Routes>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/'} element={<Profile/>}></Route>
                    <Route path={'/registration'} element={<Registration/>}></Route>
                </Routes>
            </div>
            <Snackbars/>
        </ThemeProvider>
    );
}

export default App;
