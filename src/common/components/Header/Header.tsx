import React from 'react'
import {Box, LinearProgress} from "@mui/material"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import s from './Header.module.css'
import logo from '../../../assets/images/logo.svg'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";

const Header = () => {
    const isOpen=useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Box className={s.box} px={10} width="100%">
                    <img src={logo} alt="logo"/>
                    <Button variant="contained" size="large" color="primary" sx={{ borderRadius: 7.5 }}>Sing in</Button>
                </Box>
            </Toolbar>
            {isOpen==='loading' ? <LinearProgress/> :''}
        </AppBar>
    );
};

export default Header;