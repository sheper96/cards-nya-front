import {faArrowRightFromBracket, faPen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Button, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks"
import {authTC, logOutTC,  updateNameTC} from "./auth-reducer"
import s from './Profile.module.css'

import {useNavigate} from "react-router-dom";
import React from "react";
import {initializeAppTC} from "../../app/app-reducer";

const Profile = () => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    let nameAuth=useAppSelector(state=>state.auth.name)
    let email=useAppSelector(state=>state.auth.email)

    const [name, setName] = useState(nameAuth)
    const [editmode, setEditMode] = useState(false)

    const setNameHandler = (e: any) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = () => {
        setEditMode(false)
        dispatch(updateNameTC(name))
    }
    useEffect(() => {
        dispatch(authTC())

    }, [])

    let isLoggedIn=useAppSelector(state=>state.app.isInitialized)

    /*useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn])
*/
    return (
        <div className={s.container}>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.img}>
                        <img alt='image'
                            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                    </div>
                    <div onDoubleClick={() => setEditMode(true)}>
                        {!editmode && <span className={s.name}>
                       {nameAuth} <FontAwesomeIcon icon={faPen}/></span>}
                    </div>
                    <div onBlur={updateStatusHandler}>
                        {editmode &&
                            <TextField autoFocus value={name} onChange={setNameHandler} id="standard-basic" label="Name" variant="standard" />}
                    </div>
                    <span className={s.email}>{email}</span>
                    <Button
                        onClick={() => dispatch(logOutTC())}
                        style={{
                            backgroundColor: "#ffffff",
                            color: '#000'
                        }} variant="contained" size="large" sx={{borderRadius: 7.5}}> <FontAwesomeIcon
                        icon={faArrowRightFromBracket}/>Log Out</Button>
                </div>
            </BoxContainer>
        </div>
    )
}


export default Profile;