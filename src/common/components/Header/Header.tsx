import React, { useEffect } from 'react'
import {Box} from "@mui/material"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import s from './Header.module.css'
import logo from '../../../assets/images/logo.svg'
import { authTC } from '../../../features/Profile/auth-reducer'
import { useAppDispatch } from '../../hooks/react-redux-hooks'

const Header = () => {
    
    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Box className={s.box} px={10} width="100%">
                    <img src={logo} alt="logo"/>
                    <Button variant="contained" size="large" color="primary" sx={{ borderRadius: 7.5 }}>Sing in</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;