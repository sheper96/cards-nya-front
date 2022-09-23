import React, {useEffect} from 'react';
import Registration from '../features/Registration/Registration';
import s from './App.module.css'
import Header from "../common/components/Header/Header";
import {Route, Routes} from "react-router-dom";
import {createTheme} from '@mui/material/styles'
import {ThemeProvider} from "@mui/material";
import {Snackbars} from "../common/snackbars/Snackbars";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackBat";
import {NewPassword} from "../features/NewPassword/NewPassword";

import { Login } from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import {initializeAppTC} from "./app-reducer";
import {useAppDispatch} from "../common/hooks/react-redux-hooks";




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
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Profile/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/profile'} element={<Profile/>}></Route>
                    <Route path={'/registration'} element={<Registration/>}></Route>
                    <Route path={'/newpassword'} element={<NewPassword/>}></Route>
                </Routes>
            </div>
            <Snackbars/>
            <ErrorSnackbar/>
        </ThemeProvider>
    );
}

export default App;
