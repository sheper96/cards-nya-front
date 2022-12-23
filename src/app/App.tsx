import React, {useEffect, useLayoutEffect, useState} from 'react';
import Registration from '../features/Registration/Registration';
import s from './App.module.css'
import Header from "../common/components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {createTheme} from '@mui/material/styles'
import {CircularProgress, ThemeProvider} from "@mui/material";
import {Snackbars} from "../common/snackbars/Snackbars";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackBat";
import { Login } from '../features/Login/Login';
import Profile from '../features/Profile/Profile';
import {useAppDispatch, useAppSelector} from "../common/hooks/react-redux-hooks";
import ForgotPassword from '../features/ForgotPassword/ForgotPassword';
import { CheckEmail } from '../features/ForgotPassword/CheckEmail';
import { SetNewPassword } from '../features/ForgotPassword/SetNewPassword';
import {CardsPack} from "../features/CardsPack/CardsPack";
import { Card } from '../features/Card/Card';
import { initializeAppTC } from './app-reducer';
import { Learn } from '../features/Learn/Learn';
import { Packs } from '../features/Packs/Packs';
import { Error404 } from '../common/Error404/Error404';


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
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
      dispatch(initializeAppTC())
    }, [])
    
    if (!isInitialized) {
        return <div className={s.init}>
            <CircularProgress color="inherit"/>
        </div>
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <Header/>
                <div className={s.appContainer}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/profile'} element={<Profile/>}></Route>
                    <Route path={'/registration'} element={<Registration/>}></Route>
                    <Route path={'/forgotpassword'} element={<ForgotPassword/>}></Route>
                    <Route path={'/checkemail'} element={<CheckEmail/>}></Route>
                    <Route path={'/set-new-password/:token'} element={<SetNewPassword/>}></Route>
                    <Route path={'/packs'} element={<CardsPack/>}></Route>
                    <Route path={'/packs1'} element={<Packs/>}></Route>
                    <Route path={'/cards'} element={<Card/>}></Route>
                    <Route path={'/learn/:packId'} element={<Learn/>}></Route>
                    <Route path={'/error404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
                </Routes>
                </div>
            </div>
            <Snackbars/>
            <ErrorSnackbar/>
        </ThemeProvider>
    );
}

export default App;
