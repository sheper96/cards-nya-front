import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import s from './Header.module.css'
import logo from '../../../assets/images/logo.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";
import { Box, LinearProgress } from '@mui/material'

const Header = () => {
    const isOpen=useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)

    const dispatch = useAppDispatch()
    
    const name = useAppSelector(state=>state.auth.userInfo?.name)
    const initialized = useAppSelector(state=>state.app.isInitialized)
    
    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Box className={s.box} px={10} width="100%">
                    <img src={logo} alt="logo"/>
                    {initialized ? 
                        <div className={s.button}>
                            <div className={s.name}>
                                <h3>{name}</h3>
                            </div>
                            <div className={s.img}>
                                <img
                                    src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                            </div>
                        </div>
                        : <Button variant="contained" size="large" color="primary" sx={{ borderRadius: 7.5 }}>Sing in</Button> }
                   
                </Box>
            </Toolbar>
            {isOpen==='loading' ? <LinearProgress/> :''}
        </AppBar>
    );
};

export default Header;